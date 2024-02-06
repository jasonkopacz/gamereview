import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.content}>
        <nav>
          <Link href="https://www.jasonkopacz.com/">Jason Kopacz</Link>
            <br />
          <Link href="https://www.linkedin.com/in/jason-kopacz-2917264a/">LinkedIn</Link>
        </nav>
        <nav>
          <Link href="https://www.jasonkopacz.com">My blog</Link>
          <br />
          <Link href="https://www.github.com/jasonkopacz">My Github</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;