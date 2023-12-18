import ProductPage from "../../../components/Product/ProductPage";
import productService from "../../../services/product.service";
const {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} = require("@testing-library/react");

jest.mock("../../../services/product.service");

let ProductPageTest = "ProductPageComponent";
describe(ProductPageTest, () => {
  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      price: 10,
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
    {
      _id: "2",
      name: "Product 2",
      price: 100,
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
  ];

  beforeEach(() => {
    cleanup();
    productService.getAllProducts.mockReset();
    productService.deleteProduct.mockReset();
  });

  describe("boundary", () => {
    test(`${ProductPageTest} should render product heading`, async () => {
      productService.getAllProducts.mockResolvedValue([]);
      render(<ProductPage />);

      expect(await screen.findByText("Products")).toBeTruthy();
    });

    test(`${ProductPageTest} should render product table with appropiate heading when data is available`, async () => {
      productService.getAllProducts.mockResolvedValue(mockProducts);
      render(<ProductPage />);

      expect(screen.queryByText("No Products Found")).not.toBeTruthy();
      expect(await screen.findByText("Image")).toBeTruthy();
      expect(await screen.findByText("Name")).toBeTruthy();
      expect(await screen.findByText("Price")).toBeTruthy();
      expect(await screen.findByText("Description")).toBeTruthy();
      expect(await screen.findByText("Featured")).toBeTruthy();
      expect(await screen.findByText("Action")).toBeTruthy();
    });

    test(`${ProductPageTest} should render all the products when data is available`, async () => {
      productService.getAllProducts.mockResolvedValue(mockProducts);
      render(<ProductPage />);

      expect(await screen.findByText("Product 1")).toBeTruthy();
    });

    test(`${ProductPageTest} should render "No Products Found" when no data is available`, async () => {
      productService.getAllProducts.mockResolvedValue([]);
      render(<ProductPage />);
      expect(await screen.findByText("No Products Found")).toBeTruthy();
    });

    test(`${ProductPageTest} should render "No Products Found" when product fetching fails`, async () => {
      const error = new Error("API fails");
      productService.getAllProducts.mockRejectedValueOnce(error);
      render(<ProductPage />);
      expect(await screen.findByText("No Products Found")).toBeTruthy();
    });

    test(`${ProductPageTest} should delete by ID when click on delete button`, async () => {
      productService.getAllProducts.mockResolvedValue(mockProducts);
      render(<ProductPage />);
      expect(await screen.findByText("Product 1")).toBeTruthy();
      expect(await screen.findByText("Product 2")).toBeTruthy();

      productService.deleteProduct.mockResolvedValueOnce({ success: true });
      fireEvent.click(screen.getAllByText("Delete")[1]);
      expect(productService.deleteProduct).toHaveBeenCalledWith("2");
      await waitFor(() => {
        expect(screen.queryByText("Product 2")).not.toBeTruthy();
      });
    });

    test(`${ProductPageTest} should render product when delete function fails`, async () => {
      productService.getAllProducts.mockResolvedValue(mockProducts);
      render(<ProductPage />);
      expect(await screen.findByText("Product 1")).toBeTruthy();
      expect(await screen.findByText("Product 2")).toBeTruthy();

      const error = new Error("Delete failed");
      productService.deleteProduct.mockRejectedValueOnce(error);
      fireEvent.click(screen.getAllByText("Delete")[1]);
      expect(productService.deleteProduct).toHaveBeenCalledWith("2");
      await waitFor(() => {
        expect(screen.queryByText("Product 2")).toBeTruthy();
      });
    });
  });
});
