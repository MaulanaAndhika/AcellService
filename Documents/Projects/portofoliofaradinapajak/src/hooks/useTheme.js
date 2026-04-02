import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored) return stored;
    // Respect system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
