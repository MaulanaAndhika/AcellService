import { FiMail, FiLinkedin, FiPhone, FiArrowUp } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span>⚖️</span>
              <div>
                <strong>Faradina Putri Andini</strong>
                <span>Tax Specialist & Communicator</span>
              </div>
            </div>
            <p className="footer__tagline">
              Membantu Anda memenuhi kewajiban perpajakan dengan tepat, efisien, dan penuh kepercayaan.
            </p>
            <div className="footer__socials">
              <a href="mailto:faradina.pajak@email.com" className="footer__social" aria-label="Email" id="footer-email">
                <FiMail size={18} />
              </a>
              <a href="https://linkedin.com/in/faradina-pajak" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn" id="footer-linkedin">
                <FiLinkedin size={18} />
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="WhatsApp" id="footer-whatsapp">
                <FiPhone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigasi</h4>
            <ul className="footer__nav">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button className="footer__nav-link" onClick={() => handleNavClick(l.href)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Layanan</h4>
            <ul className="footer__nav">
              {[
                "Konsultasi Perpajakan",
                "Pelaporan SPT Tahunan",
                "Pengelolaan e-Faktur",
                "Tax Compliance Review",
                "Edukasi Pajak",
                "Financial Analysis",
              ].map((s) => (
                <li key={s}>
                  <span className="footer__service-item">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Faradina Putri Andini · Tax Specialist & Communicator. All Rights Reserved.
          </p>
          <p className="footer__sub">
            Designed & Developed with ❤️
          </p>
          <button className="footer__scroll-top" onClick={scrollTop} aria-label="Scroll to top" id="footer-scroll-top">
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
