import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiMessageCircle, FiSend, FiDownload, FiPhone } from "react-icons/fi";
import "./Contact.css";

const contactLinks = [
  {
    id: "contact-email",
    icon: <FiMail size={22} />,
    label: "Email",
    value: "faradina.pajak@email.com",
    href: "mailto:faradina.pajak@email.com",
    color: "#1A56DB",
    desc: "Kirim pertanyaan atau proposal kolaborasi",
  },
  {
    id: "contact-linkedin",
    icon: <FiLinkedin size={22} />,
    label: "LinkedIn",
    value: "linkedin.com/in/faradina-pajak",
    href: "https://linkedin.com/in/faradina-pajak",
    color: "#0A66C2",
    desc: "Terhubung secara profesional di LinkedIn",
  },
  {
    id: "contact-whatsapp",
    icon: <FiPhone size={22} />,
    label: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890?text=Halo%20Faradina%2C%20saya%20ingin%20berkonsultasi%20mengenai%20perpajakan.",
    color: "#25D366",
    desc: "Chat langsung untuk konsultasi cepat",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build mailto link as fallback
    const body = `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto = `mailto:faradina.pajak@email.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Hubungi Saya</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Siap membantu kebutuhan perpajakan Anda. Jangan ragu untuk menghubungi saya!
          </p>
        </div>

        <div className="contact__main">
          {/* Left: Contact Cards + CTA */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact__cta-header">
              <h3>Mari Berkolaborasi! 🤝</h3>
              <p>
                Saya terbuka untuk peluang konsultasi pajak, proyek keuangan,
                maupun kerjasama konten edukasi perpajakan. Respon dalam 24 jam kerja.
              </p>
            </div>

            <div className="contact__links">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="contact__link-card"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="contact__link-icon"
                    style={{ background: `${link.color}18`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="contact__link-info">
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                    <span className="contact__link-desc">{link.desc}</span>
                  </div>
                  <span className="contact__link-arrow" style={{ color: link.color }}>▶</span>
                </motion.a>
              ))}
            </div>

            {/* Download CV */}
            <a
              href="/cv-faradina.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg contact__cv-btn"
              id="contact-download-cv"
            >
              <FiDownload size={18} />
              Download CV — Faradina Putri Andini
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
              <h3 className="contact__form-title">Kirim Pesan</h3>

              {submitted && (
                <div className="contact__form-success">
                  ✅ Pesan terkirim! Saya akan segera merespons Anda.
                </div>
              )}

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="name">Nama Lengkap *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject">Subjek *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Contoh: Konsultasi PPh 21, Lapor SPT, dll."
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Pesan *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Ceritakan kebutuhan perpajakan atau pertanyaan Anda..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" id="contact-submit-btn">
                <FiSend size={18} />
                Kirim Pesan
              </button>

              <p className="contact__form-note">
                * Dengan mengirim pesan, Anda setuju bahwa informasi yang diberikan akan digunakan untuk keperluan komunikasi.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
