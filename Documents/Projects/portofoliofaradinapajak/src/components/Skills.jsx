import { useState } from "react";
import { motion } from "framer-motion";
import { taxSkills, communicationSkills, tools, certifications } from "../data/skills";
import "./Skills.css";

const categories = [
  { id: "tax", label: "Tax & Finance", skills: taxSkills, icon: "📋" },
  { id: "comm", label: "Communication & Media", skills: communicationSkills, icon: "🎤" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("tax");

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Core Competencies</span>
          <h2 className="section-title">Keahlian & Kompetensi</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Keahlian spesifik di bidang perpajakan, keuangan, komunikasi, dan media kreatif.
          </p>
        </div>

        {/* Skill Category Tabs */}
        <div className="skills__tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills__tab${activeTab === cat.id ? " skills__tab--active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills__main">
          {/* Skill Bars */}
          <motion.div
            key={activeTab}
            className="skills__bars"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="skills__category-title">
              {activeCategory.icon} {activeCategory.label}
            </h3>
            <div className="skills__bar-list">
              {activeCategory.skills.map((skill, i) => (
                <motion.div
                  className="skills__bar-item"
                  key={skill.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="skills__bar-header">
                    <span className="skills__bar-name">{skill.name}</span>
                    <span className="skills__bar-level">{skill.level}%</span>
                  </div>
                  <div className="skills__bar-track">
                    <motion.div
                      className="skills__bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Tools + Certifications */}
          <div className="skills__sidebar">
            {/* Tools */}
            <div className="skills__tools-card">
              <h3 className="skills__sidebar-title">🛠️ Tools & Aplikasi</h3>
              <div className="skills__tools-grid">
                {tools.map((tool, i) => (
                  <motion.div
                    className={`skills__tool skills__tool--${tool.category.toLowerCase()}`}
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="skills__tool-icon">{tool.icon}</span>
                    <span className="skills__tool-name">{tool.name}</span>
                    <span className="skills__tool-category badge badge-primary">{tool.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="skills__certs-card">
              <h3 className="skills__sidebar-title">🎓 Sertifikasi</h3>
              <div className="skills__certs-list">
                {certifications.map((cert, i) => (
                  <div className="skills__cert-item" key={i}>
                    <div className="skills__cert-icon">🏆</div>
                    <div>
                      <strong className="skills__cert-name">{cert.name}</strong>
                      <p className="skills__cert-issuer">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
