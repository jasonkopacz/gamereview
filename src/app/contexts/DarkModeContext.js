"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS
} from "../constants";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModePref = Cookies.get("darkMode");
    setDarkMode(darkModePref === "true");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newTheme = darkMode ? "dark" : "light";
    Cookies.set("darkMode", !darkMode ? "true" : "false");
    Cookies.set("color-theme", newTheme, {
      expires: 1000
    });

    const newTokens = newTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute("data-color-theme", newTheme);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
