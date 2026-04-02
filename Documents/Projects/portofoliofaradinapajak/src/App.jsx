import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlogDetail from "./pages/BlogDetail";
import { useTheme } from "./hooks/useTheme";
import "./styles/global.css";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}
