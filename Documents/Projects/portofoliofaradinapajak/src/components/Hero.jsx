import { motion } from "framer-motion";
import { FiBriefcase, FiMessageCircle, FiDownload, FiAward, FiUsers, FiBookOpen } from "react-icons/fi";
import "./Hero.css";

const stats = [
  { icon: <FiBriefcase size={18} />, value: "2+", label: "Tahun Pengalaman" },
  { icon: <FiAward size={18} />, value: "Brevet A&B", label: "Sertifikasi Pajak" },
  { icon: <FiUsers size={18} />, value: "10+", label: "Proyek Perpajakan" },
  { icon: <FiBookOpen size={18} />, value: "S1", label: "Administrasi Fiskal" },
];

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      {/* Background decoration */}
      <div className="hero__bg">
        <div className="hero__bg-blob hero__bg-blob--1" />
        <div className="hero__bg-blob hero__bg-blob--2" />
        <div className="hero__bg-grid" />
        
        {/* Floating money elements */}
        <motion.div className="hero__money hero__money--1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>💵</motion.div>
        <motion.div className="hero__money hero__money--2" animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }} transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}>💰</motion.div>
        <motion.div className="hero__money hero__money--3" animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}>💸</motion.div>
        <motion.div className="hero__money hero__money--4" animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }} transition={{ duration: 4.5, delay: 2, repeat: Infinity, ease: "easeInOut" }}>🤑</motion.div>
      </div>

      <div className="container hero__inner">
        {/* Text Content */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="hero__badge-dot" />
            Available for Consulting & Collaboration
          </motion.div>

          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Halo, Saya
          </motion.p>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Faradina <span className="gradient-text">Putri Andini</span>
          </motion.h1>

          <motion.div
            className="hero__title-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="hero__title">Junior Tax Consultant</span>
            <span className="hero__title-divider">•</span>
            <span className="hero__title hero__title--secondary">Tax Communicator</span>
          </motion.div>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Membantu individu dan bisnis memenuhi kewajiban perpajakan dengan{" "}
            <strong>tepat, efisien, dan penuh kepercayaan</strong>. Berpengalaman
            dalam compliance, pelaporan, dan edukasi pajak.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              className="btn btn-primary btn-lg"
              onClick={() => scrollTo("experience")}
              id="hero-view-experience-btn"
            >
              <FiBriefcase size={18} />
              View Experience
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => scrollTo("contact")}
              id="hero-contact-btn"
            >
              <FiMessageCircle size={18} />
              Contact Me
            </button>
            <a
              href="/cv-faradina.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              id="hero-download-cv"
            >
              <FiDownload size={18} />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring hero__avatar-ring--outer" />
            <div className="hero__avatar-ring hero__avatar-ring--inner" />
            <div className="hero__avatar">
              <img
                src="/profile-placeholder.png"
                alt="Faradina Putri Andini - Tax Consultant"
                className="hero__avatar-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.querySelector(".hero__avatar-fallback").style.display = "flex";
                }}
              />
              <div className="hero__avatar-fallback">
                <span style={{ fontSize: "4rem" }}>👩‍💼</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="hero__float hero__float--tl">
              <span>📋</span>
              <span>Tax Compliance</span>
            </div>
            <div className="hero__float hero__float--br">
              <span>🏛️</span>
              <span>DJP Online</span>
            </div>
            <div className="hero__float hero__float--tr">
              <span>⚖️</span>
              <span>Brevet A&B</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        className="hero__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="container hero__stats-inner">
          {stats.map((stat, i) => (
            <div className="hero__stat" key={i}>
              <span className="hero__stat-icon">{stat.icon}</span>
              <div>
                <strong className="hero__stat-value">{stat.value}</strong>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => scrollTo("about")}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
}
