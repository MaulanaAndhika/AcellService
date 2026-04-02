import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blog";
import { FiArrowLeft, FiClock, FiTag, FiShare2 } from "react-icons/fi";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="blog-detail__not-found">
        <h2>Artikel tidak ditemukan</h2>
        <button className="btn btn-primary" onClick={() => navigate("/#blog")}>
          Kembali ke Blog
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link artikel disalin ke clipboard!");
    }
  };

  // Simple markdown-like renderer for the content
  const renderContent = (content) => {
    return content
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
        if (line.startsWith("#### ")) return <h4 key={i}>{line.slice(5)}</h4>;
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} style={{ fontWeight: 700 }}>{line.slice(2, -2)}</p>;
        }
        if (line.startsWith("- ")) return <li key={i}>{line.slice(2)}</li>;
        if (line.startsWith("> ")) {
          return (
            <blockquote key={i} className="blog-detail__blockquote">
              {line.slice(2)}
            </blockquote>
          );
        }
        if (line.startsWith("| ")) return null; // Skip table lines for simplicity
        if (line.trim() === "") return <br key={i} />;
        return <p key={i}>{line}</p>;
      })
      .filter(Boolean);
  };

  const related = blogPosts.filter((p) => p.id !== id).slice(0, 2);

  return (
    <div className="blog-detail">
      {/* Header */}
      <div
        className="blog-detail__hero"
        style={{ background: `linear-gradient(135deg, ${post.coverColor}ee, ${post.coverColor}99)` }}
      >
        <div className="container blog-detail__hero-inner">
          <button
            className="blog-detail__back"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            id="blog-detail-back-btn"
          >
            <FiArrowLeft size={18} />
            Kembali ke Blog
          </button>

          <div className="blog-detail__category-badge">{post.category}</div>
          <h1 className="blog-detail__title">{post.title}</h1>
          <p className="blog-detail__excerpt">{post.excerpt}</p>

          <div className="blog-detail__meta">
            <span>🗓️ {post.date}</span>
            <span>·</span>
            <span className="blog-detail__readtime"><FiClock size={14} /> {post.readTime}</span>
            <span>·</span>
            <span>✍️ Faradina Putri Andini</span>
          </div>
        </div>
      </div>

      <div className="container blog-detail__body">
        <div className="blog-detail__content">
          {/* Tags */}
          <div className="blog-detail__tags">
            {post.tags.map((tag) => (
              <span className="badge badge-primary" key={tag}>
                <FiTag size={10} /> {tag}
              </span>
            ))}
            <button className="btn btn-ghost blog-detail__share" onClick={handleShare} id="blog-detail-share-btn">
              <FiShare2 size={14} />
              Share
            </button>
          </div>

          {/* Article body */}
          <article className="blog-detail__article">
            {renderContent(post.content)}
          </article>

          {/* Author Card */}
          <div className="blog-detail__author">
            <div className="blog-detail__author-avatar">👩‍💼</div>
            <div className="blog-detail__author-info">
              <strong>Faradina Putri Andini</strong>
              <span>Junior Tax Consultant · Tax Communicator</span>
              <p>
                Profesional muda di bidang perpajakan dengan keahlian di Tax Compliance,
                e-Filing, dan edukasi pajak. Siap membantu kebutuhan perpajakan Anda.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                id="blog-detail-contact-btn"
              >
                Konsultasi Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="blog-detail__sidebar">
          <div className="blog-detail__sidebar-card">
            <h3>Artikel Terkait</h3>
            {related.map((r) => (
              <div
                key={r.id}
                className="blog-detail__related"
                onClick={() => {
                  navigate(`/blog/${r.id}`);
                  window.scrollTo(0, 0);
                }}
                role="button"
                id={`related-${r.id}`}
              >
                <div
                  className="blog-detail__related-cover"
                  style={{ background: r.coverColor }}
                >
                  📝
                </div>
                <div>
                  <p className="blog-detail__related-title">{r.title}</p>
                  <span className="blog-detail__related-date">{r.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="blog-detail__sidebar-card blog-detail__cta-card">
            <h3>💬 Butuh Konsultasi?</h3>
            <p>
              Saya siap membantu kebutuhan perpajakan Anda secara profesional dan terpercaya.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              id="sidebar-contact-btn"
            >
              Hubungi Sekarang
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
