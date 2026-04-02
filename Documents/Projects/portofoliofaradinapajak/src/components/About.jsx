import { motion } from "framer-motion";
import { FiBookOpen, FiBriefcase, FiUsers, FiStar } from "react-icons/fi";
import { education } from "../data/experience";
import "./About.css";

const values = [
  {
    icon: <FiBookOpen size={22} />,
    title: "Deep Tax Knowledge",
    desc: "Pemahaman mendalam tentang regulasi perpajakan Indonesia, mulai dari PPh, PPN, hingga kebijakan fiskal terkini.",
  },
  {
    icon: <FiBriefcase size={22} />,
    title: "Professional Integrity",
    desc: "Komitmen penuh pada akurasi, ketepatan waktu, dan kerahasiaan data dalam setiap penugasan perpajakan.",
  },
  {
    icon: <FiUsers size={22} />,
    title: "Client-Oriented",
    desc: "Mengutamakan kepuasan klien dengan komunikasi yang jelas dan solusi yang terukur sesuai kebutuhan.",
  },
  {
    icon: <FiStar size={22} />,
    title: "Continuous Learning",
    desc: "Selalu mengikuti perkembangan regulasi perpajakan dan teknologi terbaru seperti CoreTax DJP.",
  },
];

const highlights = [
  { label: "Lulusan", value: "Administrasi Fiskal" },
  { label: "IPK", value: "3.75 / 4.00" },
  { label: "Sertifikasi", value: "Brevet A & B" },
  { label: "Bahasa", value: "Indonesia & Inggris" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Tentang Saya</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Profesional muda di bidang perpajakan yang berdedikasi dalam membantu klien mengelola kewajiban pajak secara efektif dan efisien.
          </p>
        </div>

        <div className="about__main">
          {/* Left: Profile Card */}
          <motion.div
            className="about__profile-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about__profile-img">
              <div className="about__profile-img-inner">
                <span style={{ fontSize: "5rem" }}>👩‍💼</span>
              </div>
              <div className="about__profile-badge">
                <span>⚖️</span>
                <span>Tax Specialist</span>
              </div>
            </div>

            <div className="about__highlights">
              {highlights.map((h, i) => (
                <div className="about__highlight-item" key={i}>
                  <span className="about__highlight-label">{h.label}</span>
                  <span className="about__highlight-value">{h.value}</span>
                </div>
              ))}
            </div>

            {/* Education */}
            {education.map((edu) => (
              <div className="about__edu" key={edu.id}>
                <div className="about__edu-icon">🎓</div>
                <div>
                  <strong className="about__edu-degree">{edu.degree}</strong>
                  <p className="about__edu-inst">{edu.institution}</p>
                  <p className="about__edu-period">{edu.period} · GPA {edu.gpa}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Story & Values */}
          <motion.div
            className="about__story"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="about__story-title">Latar Belakang Profesional</h3>
            <div className="about__story-text">
              <p>
                Saya adalah seorang profesional muda di bidang perpajakan dengan latar belakang akademis
                di <strong>Administrasi Fiskal</strong>. Passion saya terhadap dunia perpajakan bukan
                hanya sebatas teknis, melainkan juga pada bagaimana saya dapat mengkomunikasikan
                kompleksitas pajak dengan cara yang mudah dipahami oleh semua kalangan.
              </p>
              <p>
                Pengalaman saya mencakup berbagai aspek perpajakan — dari <strong>penyusunan dan pelaporan SPT</strong>,
                pengelolaan <strong>e-Faktur & e-Bupot</strong>, hingga <strong>konsultasi kepatuhan pajak</strong>
                untuk klien dari berbagai sektor industri. Saya juga aktif dalam kegiatan organisasi
                kampus, di mana saya mengasah kemampuan <strong>kepemimpinan, public speaking, dan manajemen event</strong>.
              </p>
              <p>
                Selain perpajakan, saya memiliki keahlian di bidang <strong>konten kreatif dan media sosial</strong>,
                menjadikan saya tenaga profesional yang mampu berkomunikasi dengan klien secara efektif
                dalam era digital ini.
              </p>
            </div>

            {/* Values Grid */}
            <div className="about__values">
              {values.map((v, i) => (
                <motion.div
                  className="about__value-card"
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <div className="about__value-icon">{v.icon}</div>
                  <div>
                    <h4 className="about__value-title">{v.title}</h4>
                    <p className="about__value-desc">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
