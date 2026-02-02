import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import RootLayout from "../app/layout";

test("renders the main headline and TOC", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: /table of contents/i })
  ).toBeInTheDocument();
});

test("uses the document font variables on body", () => {
  const element = RootLayout({ children: <Home /> });
  const body = element.props.children;
  expect(body.props.className).toMatch(/font/);
});
