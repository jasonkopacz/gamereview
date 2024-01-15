import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div>
          <p className={styles.attribution}>
            Created by{' '}
            <a href="https://www.jasonkopacz.com/">
              Jason Kopacz
            </a>
            <br />
            Check out my{' '}
            <a href="https://www.linkedin.com/in/jason-kopacz-2917264a/">
              LinkedIn
            </a>{' '}
          </p>
        </div>
        <nav>
          <h2 className={styles.linkHeading}>Links</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href="https://www.jasonkopacz.com">My blog</Link>
            </li>
            <li>
              <Link href="https://www.github.com/jasonkopacz">My Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;