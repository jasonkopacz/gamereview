import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.wrapper} role="contentinfo">
      <div className={styles.content}>
        <nav title="socials">
          <Link
            href="https://jasonkopacz.github.io/site/"
            aria-label="portfolio"
            title="portfolio"
          >
            Jason Kopacz
          </Link>
          <br />
          <Link
            href="https://www.linkedin.com/in/jason-kopacz-2917264a/"
            aria-label="linkedin"
            title="linkedin"
          >
            LinkedIn
          </Link>
        </nav>
        <nav title="socials">
          <Link
            href="https://www.jasonkopacz.com"
            aria-label="blog"
            title="blog"
          >
            My blog
          </Link>
          <br />
          <Link
            href="https://www.github.com/jasonkopacz"
            aria-label="github"
            title="github"
          >
            My Github
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
