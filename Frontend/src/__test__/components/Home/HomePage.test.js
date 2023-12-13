import { render, screen } from "@testing-library/react";
import Home from "../../../components/Home/Home";

test("Render Home page", () => {
  render(<Home />);
  const welcomeText = screen.getByText(/Ecommerce Admin Dashboard/i);
  expect(welcomeText).toBeInTheDocument();
});
