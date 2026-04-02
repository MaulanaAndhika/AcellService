import { useState, useEffect } from "react";
import { FiMoon, FiSun, FiMenu, FiX, FiDownload } from "react-icons/fi";
import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        {/* Logo */}
        <a className="navbar__logo" href="#home" onClick={() => handleNavClick("#home")}>
          <span className="navbar__logo-icon">⚖️</span>
          <div>
            <span className="navbar__logo-name">Faradina Pajak</span>
            <span className="navbar__logo-tagline">Tax Specialist</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                className={`navbar__link${activeSection === link.href.replace("#", "") ? " navbar__link--active" : ""}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>



          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            id="hamburger-btn"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile${menuOpen ? " navbar__mobile--open" : ""}`} aria-hidden={!menuOpen}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                className={`navbar__mobile-link${activeSection === link.href.replace("#", "") ? " navbar__mobile-link--active" : ""}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </button>
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
}
