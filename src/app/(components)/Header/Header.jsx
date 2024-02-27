"use client";
import React from "react";
import clsx from "clsx";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styles from "./Header.module.css";
import { dark, neobrutalism } from "@clerk/themes";

import {
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS
} from "../../constants";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleToggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, newTheme, {
      expires: 1000
    });

    const newTokens = newTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute("data-color-theme", newTheme);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  const clerkTheme = theme === "light" ? neobrutalism : dark;

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <div className={styles.actions}>
        <Link href="/" className={styles.action}>
          {" "}
          Home{" "}
        </Link>
        <button className={styles.action} onClick={handleToggleTheme}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
      <div className={styles.actions}>
        <Link href="/dashboard" className={styles.action}>
          {" "}
          Dashboard{" "}
        </Link>
        <Link href="/profile" className={styles.action}>
          {" "}
          Profile{" "}
        </Link>
        <UserButton
          appearance={{
            baseTheme: clerkTheme,
            variables: { colorPrimary: "red" }
          }}
        />
      </div>
    </header>
  );
}

export default Header;
