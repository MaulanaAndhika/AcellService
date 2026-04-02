import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blog";
import { FiClock, FiTag, FiArrowRight } from "react-icons/fi";
import "./Blog.css";

const categoryColors = {
  "Tax Compliance": "#1A56DB",
  "Tax Knowledge": "#F5A623",
  "Tax Tips": "#10B981",
  "Tax Update": "#8B5CF6",
};

export default function Blog() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];
  const filtered =
    filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="section blog">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Edukasi Pajak</span>
          <h2 className="section-title">Blog & Artikel</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Berbagi pengetahuan perpajakan yang praktis dan mudah dipahami untuk individu dan pelaku bisnis.
          </p>
        </div>

        {/* Category Filter */}
        <div className="blog__filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`blog__filter-btn${filter === cat ? " blog__filter-btn--active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="blog__grid">
          {filtered.map((post, i) => (
            <motion.article
              className="blog__card"
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${post.id}`)}
              id={`blog-card-${post.id}`}
            >
              {/* Cover */}
              <div
                className="blog__card-cover"
                style={{ background: `linear-gradient(135deg, ${post.coverColor}dd, ${post.coverColor}88)` }}
              >
                <span className="blog__card-cover-icon">📝</span>
                <div className="blog__card-category"
                  style={{ background: post.coverColor }}>
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="blog__card-body">
                <div className="blog__card-meta">
                  <span className="blog__card-date">{post.date}</span>
                  <span className="blog__card-dot">·</span>
                  <span className="blog__card-read"><FiClock size={12} /> {post.readTime}</span>
                </div>

                <h3 className="blog__card-title">{post.title}</h3>
                <p className="blog__card-excerpt">{post.excerpt}</p>

                <div className="blog__card-footer">
                  <div className="blog__card-tags">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span className="badge badge-primary" key={tag}>
                        <FiTag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <span className="blog__card-read-more">
                    Baca Selengkapnya <FiArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
