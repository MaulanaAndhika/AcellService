import { useState } from "react";
import { motion } from "framer-motion";
import {
  workExperience,
  internshipExperience,
  organizationExperience,
  committeeExperience,
} from "../data/experience";
import "./Experience.css";

const tabs = [
  { id: "work", label: "Pengalaman Kerja", icon: "💼", data: workExperience },
  { id: "internship", label: "Magang", icon: "📚", data: internshipExperience },
  { id: "organization", label: "Organisasi", icon: "🏛️", data: organizationExperience },
  { id: "committee", label: "Kepanitiaan", icon: "🎪", data: committeeExperience },
];

function TimelineCard({ item, index }) {
  return (
    <motion.div
      className="exp__card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="exp__card-header">
        <div>
          <h3 className="exp__card-title">{item.title}</h3>
          <p className="exp__card-company">{item.company}</p>
        </div>
        <div className="exp__card-meta">
          <span className="exp__card-period">{item.period}</span>
          <span className="exp__card-location">📍 {item.location}</span>
        </div>
      </div>

      <ul className="exp__card-desc">
        {item.description.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <div className="exp__card-tags">
        {item.tags.map((tag) => (
          <span className="badge badge-primary" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState("work");
  const activeData = tabs.find((t) => t.id === activeTab)?.data || [];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Track Record</span>
          <h2 className="section-title">Pengalaman & Riwayat</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Rekam jejak profesional yang mencerminkan kompetensi dan dedikasi di bidang perpajakan dan organisasi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="exp__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`exp__tab${activeTab === tab.id ? " exp__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span className="exp__tab-label">{tab.label}</span>
              <span className="exp__tab-count">{tab.data.length}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="exp__timeline">
          <div className="exp__timeline-line" />
          {activeData.map((item, i) => (
            <div className="exp__timeline-item" key={item.id}>
              <div className="exp__timeline-dot" />
              <TimelineCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
