import styles from "./page.module.css";
import Cookies from "js-cookie";
import { COLOR_THEME_COOKIE_NAME } from "./constants";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  const darkMode =
    Cookies.get(COLOR_THEME_COOKIE_NAME) === "light" ? "default" : "dark";

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SignIn redirectUrl="/dashboard" />
        <h1>The Game Review</h1>
      </div>
    </main>
  );
}
