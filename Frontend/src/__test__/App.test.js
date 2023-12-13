import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";
const { render, screen } = require("@testing-library/react");

test("Links", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const homeLink = screen.getByRole("link", { name: /Home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.getAttribute("href")).toBe("/");

  const productLink = screen.getByRole("link", { name: /Product/i });
  expect(productLink).toBeInTheDocument();
  expect(productLink.getAttribute("href")).toBe("/product");
});
