import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import { FaArrowLeft, FaShare } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!post) return null;

  return (
    <div className="blog-post-page">
      <Link to="/blog" className="back-link">
        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Blog
      </Link>

      <article>
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta-header">
            <span>{post.author}</span>
            <span>•</span>
            <span>{format(parseISO(post.date), 'MMMM d, yyyy')}</span>
            <span>•</span>
            <span>{Math.ceil(post.content.length / 500)} min read</span>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div>
        </header>

        <img src={post.image} alt={post.title} className="post-hero-image" />

        <div className="post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="post-actions">
          <button className="action-btn">
            <FaShare />
            Share
          </button>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
