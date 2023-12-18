const ProductServiceImpl = require("../../modules/product/service/impl/product.serviceImpl");
const ProductModel = require("../../modules/product/dao/models/product.model");

jest.mock("../../modules/product/dao/models/product.model");

describe("Product Service", () => {
  let productTest = "ProductService functional test";
  let productService;

  beforeEach(() => {
    productService = new ProductServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("functional", () => {
    it(`${productTest} should get all the products`, async () => {
      const products = [
        {
          _id: "product_id_1",
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      ];
      ProductModel.find.mockResolvedValue(products);
      const response = await productService.getAllProducts();
      expect(response).toEqual(products);
    });

    it(`${productTest} should throw an error when failing to get all product`, async () => {
      const error = new Error("Internal Server Error");
      ProductModel.find.mockRejectedValue(error);
      await expect(productService.getAllProducts()).rejects.toThrow();
    });

    it(`${productTest} should create a new product`, async () => {
      const productId = "product_id";
      const ProductBody = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };

      const ProductData = {
        _id: productId,
        ...ProductBody,
      };

      ProductModel.create.mockResolvedValue(ProductData);
      const response = await productService.addProduct(ProductBody);
      expect(response).toEqual(ProductData);
    });

    it(`${productTest} should throw an error when creating a new product`, async () => {
      const ProductBody = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };
      const error = new Error("Internal Server Error");
      ProductModel.create.mockRejectedValue(error);
      await expect(productService.addProduct(ProductBody)).rejects.toThrow();
    });

    it(`${productTest} should update product by ID`, async () => {
      const productId = "product_id";
      const updatedProductBody = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };

      const updatedProduct = {
        _id: productId,
        ...updatedProductBody,
      };

      ProductModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);
      const response = await productService.updateProduct(
        productId,
        updatedProductBody
      );
      expect(response).toEqual(updatedProduct);
    });

    it(`${productTest} should throw an error when udating a product by ID`, async () => {
      const productId = "product_id";
      const updatedProductBody = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };

      const error = new Error("Internal Server Error");
      ProductModel.findByIdAndUpdate.mockRejectedValue(error);
      await expect(
        productService.updateProduct(productId, updatedProductBody)
      ).rejects.toThrow();
    });

    it(`${productTest} should throw an error when udating a product by ID which doest exist`, async () => {
      const productId = "product_id";
      const updatedProductBody = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };

      ProductModel.findByIdAndUpdate.mockRejectedValue(null);
      await expect(
        productService.updateProduct(productId, updatedProductBody)
      ).rejects.toThrow();
    });

    it(`${productTest} should delete product by ID`, async () => {
      const productId = "product_id";
      const deletedProductData = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };

      const deletedProduct = {
        _id: productId,
        ...deletedProductData,
      };

      ProductModel.findByIdAndDelete.mockResolvedValue(deletedProduct);
      const response = await productService.deleteProduct(productId);
      expect(response).toEqual(deletedProduct);
    });

    it(`${productTest} should throw an error when deleting a product by ID`, async () => {
      const productId = "product_id";
      const error = new Error("Internal Server Error");
      ProductModel.findByIdAndDelete.mockRejectedValue(error);
      await expect(productService.deleteProduct(productId)).rejects.toThrow();
    });

    it(`${productTest} should throw an error when deleting a product by ID which doesnt exist`, async () => {
      const productId = "product_id";
      ProductModel.findByIdAndDelete.mockRejectedValue(null);
      await expect(productService.deleteProduct(productId)).rejects.toThrow();
    });
  });
});
