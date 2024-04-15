import React from "react";
import Header from "./(components)/Header/Header";
import Footer from "./(components)/Footer/Footer";
import RespectMotionPreferences from "./(components)/RespectMotionPreferences/RespectMotionPreferences";
import { ClerkProvider } from "@clerk/nextjs";
import Cookies from "js-cookie";
import clsx from "clsx";
import { cookies } from "next/headers";
import "./styles.css";
import { Teko, Spline_Sans_Mono } from "next/font/google";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import {
  BLOG_TITLE,
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS
} from "./constants";

const mainFont = Teko({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family"
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono"
});

export const metadata = {
  title: BLOG_TITLE,
  description: "The Game Review"
};

async function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  const theme = savedTheme?.value || "light";
  Cookies.set(COLOR_THEME_COOKIE_NAME, savedTheme?.value || "light");
  return (
    <DarkModeProvider>
      <ClerkProvider>
        <RespectMotionPreferences>
          <html
            lang="en"
            className={clsx(mainFont.variable, monoFont.variable)}
            data-color-theme={theme}
            style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
          >
            <head>
              {(process.env.NODE_ENV === "development" ||
                process.env.VERCEL_ENV === "preview") && (
                // eslint-disable-next-line @next/next/no-sync-scripts
                <script
                  data-project-id="vwxWlvYqdIebWMDfuM4cIXyGYE9vvih6beqOWZY7"
                  data-is-production-environment="false"
                  src="https://snippet.meticulous.ai/v1/meticulous.js"
                />
              )}
            </head>
            <body>
              <Header initialTheme={theme} />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        </RespectMotionPreferences>
      </ClerkProvider>
    </DarkModeProvider>
  );
}

export default RootLayout;
