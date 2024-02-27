import React from "react";
import styles from "./page.module.css";
import { COLOR_THEME_COOKIE_NAME } from "./constants";
import { SignIn } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { dark, neobrutalism } from "@clerk/themes";

export default function Home() {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME).value;
  const clerkTheme = savedTheme === "light" ? neobrutalism : dark;
  const color =
    savedTheme === "dark" ? "hsl(242deg 100% 70%)" : "hsl(50deg 100% 70%)";
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SignIn
          redirectUrl="/dashboard"
          appearance={{
            baseTheme: clerkTheme,
            variables: { colorPrimary: color }
          }}
        />
        <h1>The Game Review</h1>
      </div>
    </main>
  );
}
