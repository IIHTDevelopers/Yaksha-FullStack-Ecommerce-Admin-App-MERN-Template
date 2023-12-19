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

// beforeEach(() => {
//   mockingoose.resetAll(); // Reset mockingoose before each test
// });

// afterAll(() => {
//   mongoose.connection.close();
// });

// describe("Product test", () => {
//   describe("Get route", () => {
//     describe("Product found", () => {
//       it("Should return 200 status code", async () => {
//         mockingoose(Product).toReturn([], "find");
//         const response = await request(app).get("/api/product");
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//       });

//       it("Should catch exception if any error during db operation", async () => {
//         mockingoose(Product).toReturn(new Error("Server Error"), "find");
//         const response = await request(app).get("/api/product");
//         expect(response.status).not.toBe(200);
//       });
//     });
//   });

//   describe("Post route", () => {
//     describe("To Add a product", () => {
//       it("Should return 200 status code with product object", async () => {
//         const requestBody = {
//           name: "Test Product",
//           price: 100000,
//           featured: false,
//           description: "",
//           image: "testing.png",
//         };

//         mockingoose(Product).toReturn(requestBody, "create");

//         const response = await request(app)
//           .post("/api/product")
//           .send(requestBody);
//         expect(response.status).toBe(200);
//         expect(response.body).not.toBe(null);
//         expect(response.body).toHaveProperty("name", "Test Product");
//       });

//       it("Should catch exception, if any field is missing", async () => {
//         const requestBody = {};

//         mockingoose(Product).toReturn(null, "create");
//         const response = await request(app)
//           .post("/api/product")
//           .send(requestBody);
//         expect(response.status).not.toBe(200);
//       });
//     });
//   });

//   describe("PUT Route", () => {
//     describe("To update a product", () => {
//       it("Should give 200 status if any of field is provided", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//           name: "Test Product",
//           price: 100000,
//           featured: false,
//           description: "",
//           image: "testing.png",
//           createdAt: new Date().toISOString(),
//         };

//         mockingoose(Product).toReturn(requestBody, "findOneAndUpdate");
//         const response = await request(app).put("/api/product/123").send({
//           price: 100000,
//         });
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(requestBody);
//       });

//       it("Should give 404 status if product not found", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//         };

//         mockingoose(Product).toReturn(null, "findOneAndUpdate");
//         const response = await request(app)
//           .put(`/api/product/${requestBody._id}`)
//           .send({
//             price: 100000,
//           });
//         expect(response.status).not.toBe(200);
//       });

//       it("Should catch exception if any error during db operation", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//         };

//         mockingoose(Product).toReturn(
//           new Error("Server Error"),
//           "findOneAndUpdate"
//         );
//         const response = await request(app)
//           .put(`/api/product/${requestBody._id}`)
//           .send({
//             price: 100000,
//           });
//         expect(response.status).not.toBe(200);
//       });
//     });
//   });

//   describe("DELETE Route", () => {
//     describe("To delete a product", () => {
//       it("Should give 200 status if product is deleted", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//           name: "Test Product",
//           price: 100000,
//           featured: false,
//           description: "",
//           image: "testing.png",
//           createdAt: new Date().toISOString(),
//         };

//         mockingoose(Product).toReturn(requestBody, "findOneAndDelete");
//         const response = await request(app).delete(
//           `/api/product/${requestBody._id}`
//         );
//         expect(response.status).toBe(200);
//       });

//       it("Should give 404 status if productId is not found", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//         };

//         mockingoose(Product).toReturn(null, "findOneAndDelete");
//         const response = await request(app).delete(
//           `/api/product/${requestBody._id}`
//         );
//         expect(response.status).not.toBe(200);
//       });

//       it("Should catch exception if any error during db operation", async () => {
//         const requestBody = {
//           _id: new mongoose.Types.ObjectId().toString(),
//         };

//         mockingoose(Product).toReturn(
//           new Error("Server Error"),
//           "findOneAndDelete"
//         );
//         const response = await request(app).delete(
//           `/api/product/${requestBody._id}`
//         );
//         expect(response.status).not.toBe(200);
//       });
//     });
//   });
// });
