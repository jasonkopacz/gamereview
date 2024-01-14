import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';
import { cookies } from 'next/headers';

import {
  BLOG_TITLE,
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from './constants';

import Header from './(components)/header/Header';
import Footer from './(components)/footer/Footer';
import RespectMotionPreferences from './(components)/RespectMotionPreferences/RespectMotionPreferences';

import './styles.css';
import Cookies from 'js-cookie';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

export const metadata = {
  title: BLOG_TITLE,
  description: 'BIG DAWG STATUS',
};

function RootLayout({ children }) {
  const savedTheme = cookies().get(
    COLOR_THEME_COOKIE_NAME
  );
  const theme = savedTheme?.value || 'light';
  Cookies.set(COLOR_THEME_COOKIE_NAME, savedTheme?.value || 'light')


  return (
    <RespectMotionPreferences>
        <html
          lang="en"
          className={clsx(
            mainFont.variable,
            monoFont.variable
            )}
            data-color-theme={theme}
            style={
              theme === 'light'
              ? LIGHT_TOKENS
              : DARK_TOKENS
            }
            >
          <body>
            <Header initialTheme={theme}/>
              <main>{children}</main>
            <Footer />
          </body>
        </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;