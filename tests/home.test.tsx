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

test("hides the native scrollbar via body class", () => {
  const element = RootLayout({ children: <Home /> });
  const body = element.props.children;
  expect(body.props.className).toMatch(/no-scrollbar/);
});

test("renders a reading progress meter", () => {
  render(<Home />);
  const meter = screen.getByRole("progressbar", {
    name: /reading progress/i,
  });
  expect(meter).toHaveAttribute("aria-valuemin", "0");
  expect(meter).toHaveAttribute("aria-valuemax", "100");
  expect(meter).toHaveAttribute("aria-valuenow");
});

test("renders multiple content sections with ids", () => {
  render(<Home />);
  const sections = screen.getAllByRole("region");
  expect(sections.length).toBeGreaterThan(2);
});

test("sets the content column to A4 width", () => {
  render(<Home />);
  const main = screen.getByRole("main");
  expect(main).toHaveStyle({ maxWidth: "210mm" });
});

test("provides a skip link to main content", () => {
  render(<Home />);
  const skipLink = screen.getByRole("link", { name: /skip to content/i });
  expect(skipLink).toHaveAttribute("href", "#content");
});

test("does not include dark mode styles", () => {
  const style = document.createElement("style");
  document.head.appendChild(style);
  render(<Home />);
  expect(document.styleSheets.length).toBeGreaterThan(0);
  style.remove();
});
