import UpdateForm from "../../../components/Product/UpdateForm";
import productService from "../../../services/product.service";
const {
  render,
  screen,
  fireEvent,
  waitFor,
} = require("@testing-library/react");

jest.mock("../../../services/product.service");

let updateFormTest = "updateForm Component";
describe(updateFormTest, () => {
  beforeEach(() => {
    productService.getAllProducts.mockReset();
    productService.updateProduct.mockReset();
  });
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
  describe("boundary", () => {
    test(`${updateFormTest} boundary should render the UpdateForm with "Save" button`, () => {
      render(<UpdateForm product={mockProducts[0]} />);
      expect(screen.getByText("Save")).toBeTruthy();
    });

    test(`${updateFormTest} boundary should submit the form with updated product details`, async () => {
      productService.updateProduct.mockResolvedValueOnce({
        data: { ...mockProducts[0], name: "New Name" },
      });
      const onSubmit = jest.fn();
      render(<UpdateForm onSubmit={onSubmit} product={mockProducts[0]} />);
      fireEvent.change(screen.getByLabelText("Name:"), {
        target: { value: "New Name" },
      });

      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(productService.updateProduct).toHaveBeenCalledWith(
          mockProducts[0]._id,
          {
            ...mockProducts[0],
            name: "New Name",
          }
        );
      });
    });

    test(`${updateFormTest} boundary should throw error when failed to update product details`, async () => {
      productService.updateProduct.mockRejectedValue(
        new Error("Update failed")
      );
      const onSubmit = jest.fn();
      render(<UpdateForm onSubmit={onSubmit} product={mockProducts[0]} />);

      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(productService.updateProduct).rejects.toThrow();
      });
    });
  });
});
