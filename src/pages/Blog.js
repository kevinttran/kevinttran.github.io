import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { format, parseISO, isAfter, subDays, subMonths, subYears } from 'date-fns';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

function Blog() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState(new Set());

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set(['All']);
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Tag filter
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      
      // Date filter
      let matchesDate = true;
      const postDate = parseISO(post.date);
      const now = new Date();
      
      if (dateFilter === 'Last 30 Days') {
        matchesDate = isAfter(postDate, subDays(now, 30));
      } else if (dateFilter === 'Last 6 Months') {
        matchesDate = isAfter(postDate, subMonths(now, 6));
      } else if (dateFilter === 'Last Year') {
        matchesDate = isAfter(postDate, subYears(now, 1));
      }

      return matchesTag && matchesDate;
    });
  }, [selectedTag, dateFilter]);

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

  const toggleBookmark = (e, id) => {
    e.preventDefault();
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarked(newBookmarked);
  };

  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>Engineering Blog</h1>
        <p>Thoughts on development, architecture, and the tech industry.</p>
      </header>

      {/* Filters */}
      <section className="filters-section">
        <div className="filter-group">
          <span className="filter-label">Filter by Topic:</span>
          <div className="tags-container">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-tag ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Filter by Date:</span>
          <div className="date-filters">
            {['All', 'Last 30 Days', 'Last 6 Months', 'Last Year'].map(filter => (
              <button
                key={filter}
                className={`filter-tag ${dateFilter === filter ? 'active' : ''}`}
                onClick={() => setDateFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredPost && (
        <section className="featured-section">
          <h2 className="section-title">Featured Story</h2>
          <div className="featured-grid">
            <Link to={`/blog/${featuredPost.id}`} className="blog-card featured-card">
              <img src={featuredPost.image} alt={featuredPost.title} className="blog-card-image" />
              <div className="blog-card-content">
                <h3>{featuredPost.title}</h3>
                <p className="blog-excerpt">{featuredPost.excerpt}</p>
                <div className="blog-meta">
                  <div className="author-info">
                    <div className="author-avatar">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div className="meta-text">
                      <span className="author-name">{featuredPost.author}</span>
                      <span className="post-date">{format(parseISO(featuredPost.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <button 
                    className="bookmark-btn"
                    onClick={(e) => toggleBookmark(e, featuredPost.id)}
                  >
                    {bookmarked.has(featuredPost.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Stories Section */}
      <section className="all-stories-section">
        <h2 className="section-title">All Stories</h2>
        <div className="stories-grid">
          {otherPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-card-image" />
              <div className="blog-card-content">
                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <div className="author-info">
                    <div className="author-avatar">
                      {post.author.charAt(0)}
                    </div>
                    <div className="meta-text">
                      <span className="author-name">{post.author}</span>
                      <span className="post-date">{format(parseISO(post.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <button 
                    className="bookmark-btn"
                    onClick={(e) => toggleBookmark(e, post.id)}
                  >
                    {bookmarked.has(post.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {otherPosts.length === 0 && (
          <p className="no-posts-message">No stories found matching your filters.</p>
        )}
      </section>
    </div>
  );
}

export default Blog;
