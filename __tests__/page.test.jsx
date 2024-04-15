import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../src/app/page";
import { DarkModeProvider } from "@/app/contexts/DarkModeContext";
import * as ClerkComponents from "@clerk/nextjs";

// Mock the SignIn component from @clerk/nextjs to simplify testing
jest.mock("@clerk/nextjs", () => ({
  ...jest.requireActual("@clerk/nextjs"), // This preserves other components or functions
  SignIn: jest.fn(() => <div>SignIn Component</div>) // Mock implementation of SignIn
}));

const renderHome = (darkMode = false) => {
  render(
    <DarkModeProvider value={{ darkMode }}>
      <Page />
    </DarkModeProvider>
  );
};

describe("Page component", () => {
  it("should render the home page", () => {
    renderHome();
    const titleElement = screen.getByText(/The Game Review/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the SignIn component with correct props", () => {
    const darkMode = false;
    renderHome(darkMode);

    expect(ClerkComponents.SignIn).toHaveBeenCalledWith(
      expect.objectContaining({
        redirectUrl: "/dashboard",
        appearance: expect.objectContaining({
          baseTheme: expect.any(Object),
          variables: { colorPrimary: "hsl(242deg 100% 70%)" }
        })
      }),
      {} // This represents the second argument to a component, which is normally the ref. It's empty in functional components.
    );

    const signInElement = screen.getByText(/SignIn Component/i);
    expect(signInElement).toBeInTheDocument();
  });
});
