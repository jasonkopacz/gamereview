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
import { useDarkMode } from "@/app/contexts/DarkModeContext";
import {
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS
} from "../../constants";

function Header({ initialTheme, className, ...delegated }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const clerkTheme = darkMode === true ? dark : neobrutalism;
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <div className={styles.actions}>
        <Link href="/" className={styles.action}>
          {" "}
          Home{" "}
        </Link>
        <button className={styles.action} onClick={toggleDarkMode}>
          {darkMode === true ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
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
