// Header.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/app/(components)/Header/Header";
import * as DarkModeContext from "../src/app/contexts/DarkModeContext";
import * as ClerkComponents from "@clerk/nextjs";

jest.mock(
  "next/link",
  () =>
    ({ children }) =>
      children
);
jest.mock("@clerk/nextjs", () => ({
  UserButton: jest.fn(() => <div>UserButton</div>)
}));
jest.mock("../src/app/contexts/DarkModeContext");

describe("Header component", () => {
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    DarkModeContext.useDarkMode.mockImplementation(() => ({
      darkMode: false,
      toggleDarkMode: mockToggleDarkMode
    }));
  });

  it("renders Home and Profile links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("toggles theme on button click", () => {
    render(<Header />);
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it("changes icon based on dark mode", () => {
    DarkModeContext.useDarkMode.mockImplementation(() => ({
      darkMode: true,
      toggleDarkMode: mockToggleDarkMode
    }));
    render(<Header />);
    expect(screen.getByText("Toggle dark / light mode")).toBeInTheDocument();
    expect(screen.queryByLabelText("Sun")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Moon")).toBeInTheDocument();
  });

  it("passes correct theme to UserButton based on dark mode", () => {
    DarkModeContext.useDarkMode.mockImplementation(() => ({
      darkMode: true,
      toggleDarkMode: mockToggleDarkMode
    }));
    render(<Header />);
    expect(ClerkComponents.UserButton).toHaveBeenCalledWith(
      expect.objectContaining({
        appearance: expect.objectContaining({
          baseTheme: dark,
          variables: { colorPrimary: "red" }
        })
      }),
      {}
    );
  });
});
