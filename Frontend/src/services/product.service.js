import axios from "axios";

const BACKEND_URL = "http://localhost:8081/api";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

const productService = {
  getAllProducts: async () => {
    // write your logic here
    return null;
  },

  addProduct: async (productData) => {
    // write your logic here
    return null;
  },

  updateProduct: async (productId, productData) => {
    // write your logic here
    return null;
  },

  deleteProduct: async (productId) => {
    // write your logic here
    return null;
  },
};

export default productService;
