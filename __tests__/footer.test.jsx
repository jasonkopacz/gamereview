// Footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../src/app/(components)/Footer/Footer";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders without crashing", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("contains correct links with proper attributes", () => {
    const links = [
      {
        href: "https://jasonkopacz.github.io/site/",
        label: "portfolio",
        title: "portfolio"
      },
      {
        href: "https://www.linkedin.com/in/jason-kopacz-2917264a/",
        label: "linkedin",
        title: "linkedin"
      },
      { href: "https://www.jasonkopacz.com", label: "blog", title: "blog" },
      {
        href: "https://www.github.com/jasonkopacz",
        label: "github",
        title: "github"
      }
    ];

    links.forEach((link) => {
      const linkElement = screen.getByTitle(link.title);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.href);
      expect(linkElement).toHaveAttribute("aria-label", link.label);
      expect(linkElement).toHaveAttribute("title", link.title);
    });
  });

  it("uses semantic HTML elements and roles", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByTitle("socials").length).toBe(2);
  });
});
