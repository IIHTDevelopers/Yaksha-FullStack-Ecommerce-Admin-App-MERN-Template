import { render, screen } from "@testing-library/react";
import Home from "../../../components/Home/Home";

describe("HomePageComponent", () => {
  describe("boundary", () => {
    test("HomePageComponent boundary should render the Home page", () => {
      render(<Home />);
      const welcomeText = screen.getByText(/Ecommerce Admin Dashboard/i);
      expect(welcomeText).toBeInTheDocument();
    });
  });
});
