// Index.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../src/app/(components)/dashboard/page";
import * as ClerkComponents from "@clerk/nextjs";
import Search from "../src/app/(components)/Search/Search";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn()
}));
jest.mock("../src/app/(components)/Search/Search", () =>
  jest.fn(() => <div>Search Component</div>)
);
jest.mock("../src/app/(components)/Spinner/Spinner", () =>
  jest.fn(() => <div>Spinner Component</div>)
);

describe("Index component tests", () => {
  it("displays the spinner while loading", () => {
    ClerkComponents.useUser.mockImplementation(() => ({
      isLoaded: false,
      isSignedIn: false,
      user: null
    }));

    render(<Index />);
    expect(screen.getByText("Spinner Component")).toBeInTheDocument();
    expect(Search).not.toHaveBeenCalled();
  });

  it("renders Search component with user profile when loaded and signed in", () => {
    const mockUser = { name: "John Doe", email: "john@example.com" };
    ClerkComponents.useUser.mockImplementation(() => ({
      isLoaded: true,
      isSignedIn: true,
      user: mockUser
    }));

    render(<Index />);
    expect(screen.getByText("Search Component")).toBeInTheDocument();
    expect(Search).toHaveBeenCalledWith({ profile: mockUser }, {});
  });
});
