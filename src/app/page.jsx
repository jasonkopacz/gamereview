"use client";
import styles from "./page.module.css";
import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDarkMode } from "./contexts/DarkModeContext";

export default function Home() {
  const { darkMode } = useDarkMode();
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const darkModePref = Cookies.get("color-theme");
  //   console.log(darkModePref);
  //   setDarkMode(darkModePref === "dark");
  // }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>The Game Review</h1>
        <SignIn
          redirectUrl="/dashboard"
          appearance={{
            baseTheme: !darkMode ? dark : neobrutalism,
            variables: { colorPrimary: "hsl(242deg 100% 70%)" }
          }}
        />
      </div>
    </div>
  );
}
