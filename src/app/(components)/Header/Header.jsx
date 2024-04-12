"use client";
import React from "react";
import clsx from "clsx";
import { Sun, Moon } from "react-feather";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import styles from "./Header.module.css";
import { dark, neobrutalism } from "@clerk/themes";
import { useDarkMode } from "@/app/contexts/DarkModeContext";

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
