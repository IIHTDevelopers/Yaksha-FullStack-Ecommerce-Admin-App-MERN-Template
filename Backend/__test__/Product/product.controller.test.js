const express = require("express");
const ProductServiceImpl = require("../../modules/product/service/impl/product.serviceImpl");
const ProductController = require("../../modules/product/controller/product.controller");

jest.mock("../../modules/product/dao/models/product.model");

const app = express();
app.use(express.json());

describe("Product Controller", () => {
  let productControllerBoundaryTest = `Product boundary test`;
  let productController;

  beforeEach(() => {
    productController = new ProductController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("boundary", () => {
    it(`${productControllerBoundaryTest} should get all the products`, async () => {
      const mReq = {};
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
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

      jest
        .spyOn(ProductServiceImpl.prototype, "getAllProducts")
        .mockResolvedValueOnce(products);
      await productController.getAllProducts(mReq, mRes);
      expect(ProductServiceImpl.prototype.getAllProducts).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith(products);
    });

    it(`${productControllerBoundaryTest} should return 400 error if failed to get all the products`, async () => {
      const mReq = {};
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = new Error("Internal server error");

      jest
        .spyOn(ProductServiceImpl.prototype, "getAllProducts")
        .mockRejectedValueOnce(error);
      await productController.getAllProducts(mReq, mRes);
      expect(ProductServiceImpl.prototype.getAllProducts).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(400);
    });

    it(`${productControllerBoundaryTest} should search product by name`, async () => {
      const mReq = {
        query: { name: "test" },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
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

      jest
        .spyOn(ProductServiceImpl.prototype, "searchProductByName")
        .mockResolvedValueOnce(products);
      await productController.searchProductByName(mReq, mRes);
      expect(
        ProductServiceImpl.prototype.searchProductByName
      ).toHaveBeenCalledWith("test");
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith(products);
    });

    it(`${productControllerBoundaryTest} should return 400 error when failing to search product by name`, async () => {
      const mReq = {
        query: { name: "test" },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = new Error("Internal server error");
      jest
        .spyOn(ProductServiceImpl.prototype, "searchProductByName")
        .mockRejectedValueOnce(error);
      await productController.searchProductByName(mReq, mRes);
      expect(
        ProductServiceImpl.prototype.searchProductByName
      ).toHaveBeenCalledWith("test");
      expect(mRes.status).toHaveBeenCalledWith(400);
    });

    it(`${productControllerBoundaryTest} should create a new product`, async () => {
      const mReq = {
        body: {
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const response = { _id: "", ...mReq.body };
      jest
        .spyOn(ProductServiceImpl.prototype, "addProduct")
        .mockResolvedValueOnce(response);
      await productController.addProduct(mReq, mRes);
      expect(ProductServiceImpl.prototype.addProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith(response);
    });

    it(`${productControllerBoundaryTest} should return 400 error if failed creating a new product`, async () => {
      const mReq = {
        body: {
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error("Internal Server Error");
      jest
        .spyOn(ProductServiceImpl.prototype, "addProduct")
        .mockRejectedValueOnce(error);

      await productController.addProduct(mReq, mRes);

      expect(ProductServiceImpl.prototype.addProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(400);
      expect(mRes.json).toHaveBeenCalledWith({ error: expect.any(Error) });
    });

    it(`${productControllerBoundaryTest} should return 400 error if any field is undefined while creating a new product`, async () => {
      const mReq = {
        body: {
          //   name: "Test Product",
          //   price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await productController.addProduct(mReq, mRes);

      expect(ProductServiceImpl.prototype.addProduct).not.toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(400);
    });

    it(`${productControllerBoundaryTest} should update a product by ID`, async () => {
      const productId = "product_id";
      const mReq = {
        params: {
          productId,
        },
        body: {
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const response = { _id: productId, ...mReq.body };
      jest
        .spyOn(ProductServiceImpl.prototype, "updateProduct")
        .mockResolvedValueOnce(response);
      await productController.updateProduct(mReq, mRes);
      expect(ProductServiceImpl.prototype.updateProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith(response);
    });

    it(`${productControllerBoundaryTest} should return 400 error if failed updating a product by ID`, async () => {
      const productId = "product_id";
      const mReq = {
        params: {
          productId,
        },
        body: {
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error("Internal Server Error");
      jest
        .spyOn(ProductServiceImpl.prototype, "updateProduct")
        .mockRejectedValueOnce(error);
      await productController.updateProduct(mReq, mRes);
      expect(ProductServiceImpl.prototype.updateProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(400);
      expect(mRes.json).toHaveBeenCalledWith({ error: expect.any(Error) });
    });

    it(`${productControllerBoundaryTest} should delete a product by ID`, async () => {
      const productId = "product_id";
      const mReq = {
        params: {
          productId,
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const deletedProduct = {
        name: "Test Product",
        price: 100000,
        featured: false,
        description: "",
        image: "testing.png",
        createdAt: new Date().toISOString(),
      };
      const response = { _id: productId, ...deletedProduct };
      jest
        .spyOn(ProductServiceImpl.prototype, "deleteProduct")
        .mockResolvedValueOnce(response);
      await productController.deleteProduct(mReq, mRes);
      expect(ProductServiceImpl.prototype.deleteProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.json).toHaveBeenCalledWith(response);
    });

    it(`${productControllerBoundaryTest} should return 400 error if failed deleting a product by ID`, async () => {
      const productId = "product_id";
      const mReq = {
        params: {
          productId,
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error("Internal Server Error");
      jest
        .spyOn(ProductServiceImpl.prototype, "deleteProduct")
        .mockRejectedValueOnce(error);
      await productController.deleteProduct(mReq, mRes);
      expect(ProductServiceImpl.prototype.deleteProduct).toHaveBeenCalled();
      expect(mRes.status).toHaveBeenCalledWith(400);
      expect(mRes.json).toHaveBeenCalledWith({ error: expect.any(Error) });
    });
  });
});
