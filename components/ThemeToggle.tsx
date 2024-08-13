'use client';

import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(initialTheme);
    if (initialTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    setIsDark((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  return (
    <button onClick={toggleTheme} className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors">
      {isDark ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
    </button>
  );
};

export default ThemeToggle;
