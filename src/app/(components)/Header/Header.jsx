'use client';
import React from 'react';
import clsx from 'clsx';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import Link from 'next/link';

import {
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from '../../constants'

import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

import styles from './Header.module.css';

function Header({
  initialTheme,
  className,
  ...delegated
}) {
  const [theme, setTheme] =
    React.useState(initialTheme);

  function handleToggleTheme() {
    const newTheme =
      theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, newTheme, {
      expires: 1000,
    });

    const newTokens =
      newTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-color-theme', newTheme);
    Object.entries(newTokens).forEach(
      ([key, value]) => {
        root.style.setProperty(key, value);
      }
    );
  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <div className={styles.actions}>
        <Link href="/" className={styles.action} > Home </ Link >
        <button
          className={styles.action}
          onClick={handleToggleTheme}
        >
          {theme === 'light' ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
      <div className={styles.actions}>
        <Link href="/dashboard" className={styles.action}> Dashboard </ Link >
        <Link href="/profile" className={styles.action}> Profile </ Link >
        {/* <Link href="/auth/signout" className={styles.action}> Sign Out </ Link > */}
      </div>
    </header>
  );
}

export default Header;