import AddForm from "../../../components/Product/AddForm";
import productService from "../../../services/product.service";
const {
  render,
  screen,
  fireEvent,
  waitFor,
} = require("@testing-library/react");

jest.mock("../../../services/product.service");

let AddFormTest = "AddForm Component";
describe(AddFormTest, () => {
  beforeEach(() => {
    productService.getAllProducts.mockReset();
    productService.addProduct.mockReset();
  });

  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      price: "10",
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
    {
      _id: "2",
      name: "Product 2",
      price: "100",
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
  ];
  describe("boundary", () => {
    test(`${AddFormTest} boundary should render the AddForm with "Add" button`, () => {
      render(<AddForm />);
      expect(screen.getByText("Add")).toBeTruthy();
    });

    test(`${AddFormTest} boundary should submit the form with new product details`, async () => {
      const { _id, ...addProductData } = mockProducts[0];
      productService.addProduct.mockResolvedValueOnce({
        data: { ...mockProducts[0], _id: "3" },
      });
      const onSubmit = jest.fn();
      render(<AddForm onSubmit={onSubmit} />);
      fireEvent.change(screen.getByLabelText("Name:"), {
        target: { value: addProductData.name },
      });
      fireEvent.change(screen.getByLabelText("Price:"), {
        target: { value: addProductData.price },
      });
      fireEvent.change(screen.getByLabelText("Description:"), {
        target: { value: addProductData.description },
      });
      fireEvent.change(screen.getByLabelText("Image URL:"), {
        target: { value: addProductData.image },
      });

      fireEvent.click(screen.getByText("Add"));

      await waitFor(() => {
        expect(productService.addProduct).toHaveBeenCalledWith(addProductData);
      });
    });

    test(`${AddFormTest} boundary should throw error when failed to add a new product`, async () => {
      productService.addProduct.mockRejectedValue(new Error("Add failed"));
      const onSubmit = jest.fn();
      render(<AddForm onSubmit={onSubmit} />);

      fireEvent.click(screen.getByText("Add"));

      await waitFor(() => {
        expect(productService.addProduct).rejects.toThrow();
      });
    });
  });
});
