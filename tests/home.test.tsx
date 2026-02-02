import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders the main headline and TOC", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: /table of contents/i })
  ).toBeInTheDocument();
});
