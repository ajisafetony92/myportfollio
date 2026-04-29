import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "How to Get Your First Loan",
      excerpt: "Learn the step-by-step process to secure your first loan with confidence...",
      date: "April 15, 2026",
      author: "Anthony Olaola",
      category: "Loan Tips",
      image: "https://via.placeholder.com/400x200?text=Loan+Tips"
    },
    {
      id: 2,
      title: "Understanding Interest Rates",
      excerpt: "Everything you need to know about how interest rates work and affect your loan...",
      date: "April 10, 2026",
      author: "Anthony Olaola",
      category: "Education",
      image: "https://via.placeholder.com/400x200?text=Interest+Rates"
    },
    {
      id: 3,
      title: "Top 5 Credit Score Tips",
      excerpt: "Improve your credit score with these simple yet effective strategies...",
      date: "April 5, 2026",
      author: "Anthony Olaola",
      category: "Credit Score",
      image: "https://via.placeholder.com/400x200?text=Credit+Score"
    },
    {
      id: 4,
      title: "Business Loan Guide 2026",
      excerpt: "A complete guide to securing business loans for your startup or existing business...",
      date: "March 28, 2026",
      author: "Anthony Olaola",
      category: "Business",
      image: "https://via.placeholder.com/400x200?text=Business+Loan"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Loan Tips", "Education", "Credit Score", "Business"];

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Our Blog</h1>
        <p>Stay updated with the latest news and tips about loans and finance</p>
      </div>

      <div className="blog-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <span className="blog-category">{post.category}</span>
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-author">By {post.author}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <button className="read-more">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;