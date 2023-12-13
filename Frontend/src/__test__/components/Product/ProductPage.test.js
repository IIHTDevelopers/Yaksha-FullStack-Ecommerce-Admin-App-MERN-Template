import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ProductPage from "../../../components/Product/ProductPage";
import axios from "axios";
import AddForm from "../../../components/Product/AddForm";
import UpdateForm from "../../../components/Product/UpdateForm";

jest.mock("axios");

const mockProducts = [
  {
    _id: "1",
    name: "Product 1",
    price: 10,
    description: "Description 1",
    image: "image1.jpg",
    featured: false,
  },
];

beforeEach(() => {
  cleanup();
  // Reset axios mock before each test
  axios.mockReset();
});

test("Renders ProductPage component with Products", async () => {
  axios.get.mockResolvedValue({ data: mockProducts });

  render(<ProductPage />);

  expect(await screen.findByText("Image")).toBeInTheDocument();
  expect(await screen.findByText("Name")).toBeInTheDocument();
  expect(await screen.findByText("Price")).toBeInTheDocument();
  expect(await screen.findByText("Description")).toBeInTheDocument();
  expect(await screen.findByText("Featured")).toBeInTheDocument();
  expect(await screen.findByText("Action")).toBeInTheDocument();
  expect(await screen.findByText("Product 1")).toBeInTheDocument();

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});

test("Renders ProductPage component with no products", async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<ProductPage />);

  expect(await screen.findByText("No Products Found!")).toBeInTheDocument();

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});

test("Delete a product and updates the UI", async () => {
  axios.get.mockResolvedValue({ data: mockProducts });
  axios.delete.mockResolvedValueOnce();

  render(<ProductPage />);

  // Ensure that the product is initially rendered
  expect(await screen.findByText("Product 1")).toBeInTheDocument();

  // Trigger delete action
  fireEvent.click(screen.getByText("Delete"));

  // Wait for the deletion to be completed
  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/api/product/1`
    );
  });

  // Ensure that the product is no longer in the UI
  expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
});

test("Updates a product and updates the UI", async () => {
  axios.get.mockResolvedValue({ data: mockProducts });

  render(<ProductPage />);

  // Ensure that the product is initially rendered
  expect(await screen.findByText("Product 1")).toBeInTheDocument();

  expect(screen.queryByText(/Update Product/i)).not.toBeTruthy();

  // Trigger update action
  fireEvent.click(screen.getAllByText("Update")[0]);

  expect(screen.getByText("Update Product")).toBeTruthy();
});

test("Update product form UI", async () => {
  render(<UpdateForm product={mockProducts[0]} />);

  // Check if all input elements are present
  const nameInput = screen.getByLabelText(/Name/i);
  const priceInput = screen.getByLabelText(/Price/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const imageInput = screen.getByLabelText(/Image URL/i);
  const featuredCheckbox = screen.getByLabelText(/Featured/i);
  const saveBtn = screen.getByText(/Save/i);

  // Assertions for the presence of input elements
  expect(nameInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(featuredCheckbox).toBeInTheDocument();
  expect(saveBtn).toBeInTheDocument();
});

test("Renders AddForm and handles product addition", async () => {
  // Mock axios.post to resolve with the added product
  axios.post.mockResolvedValueOnce({ data: { _id: "2", ...mockProducts[0] } });

  // Mock function for onSubmit and onCancel
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  render(<AddForm onSubmit={onSubmit} onCancel={onCancel} />);

  // Simulate entering product details in the form
  fireEvent.change(screen.getByLabelText("Name:"), {
    target: { value: "New Product" },
  });
  fireEvent.change(screen.getByLabelText("Price:"), {
    target: { value: "20" },
  });
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "Description for New Product" },
  });
  fireEvent.change(screen.getByLabelText("Image URL:"), {
    target: { value: "new-product.jpg" },
  });

  // Simulate submitting the form
  fireEvent.click(screen.getByText("Add"));

  // Wait for the addition to be completed
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/api/product`,
      {
        name: "New Product",
        price: "20",
        description: "Description for New Product",
        image: "new-product.jpg",
        featured: false,
      }
    );
  });
});
