import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Pokedex from './pages/Pokedex';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
