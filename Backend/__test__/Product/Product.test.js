const request = require("supertest");
const { app, closeServer } = require("../../index");
const Product = require("../../modules/product/model/product.model");
const mockingoose = require("mockingoose");
const { default: mongoose } = require("mongoose");

beforeEach(() => {
  mockingoose.resetAll(); // Reset mockingoose before each test
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});

describe("Product test", () => {
  describe("Get route", () => {
    describe("Product found", () => {
      it("Should return 200 status code", async () => {
        mockingoose(Product).toReturn([], "find");
        const response = await request(app).get("/api/product");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });

      it("Should catch exception if any error during db operation", async () => {
        mockingoose(Product).toReturn(new Error("Server Error"), "find");
        const response = await request(app).get("/api/product");
        expect(response.status).not.toBe(200);
      });
    });
  });

  describe("Post route", () => {
    describe("To Add a product", () => {
      it("Should return 200 status code with product object", async () => {
        const requestBody = {
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
        };

        mockingoose(Product).toReturn(requestBody, "create");

        const response = await request(app)
          .post("/api/product")
          .send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body).not.toBe(null);
        expect(response.body).toHaveProperty("name", "Test Product");
      });

      it("Should catch exception, if any field is missing", async () => {
        const requestBody = {};

        mockingoose(Product).toReturn(null, "create");
        const response = await request(app)
          .post("/api/product")
          .send(requestBody);
        expect(response.status).not.toBe(200);
      });
    });
  });

  describe("PUT Route", () => {
    describe("To update a product", () => {
      it("Should give 200 status if any of field is provided", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        };

        mockingoose(Product).toReturn(requestBody, "findOneAndUpdate");
        const response = await request(app).put("/api/product/123").send({
          price: 100000,
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(requestBody);
      });

      it("Should give 404 status if product not found", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
        };

        mockingoose(Product).toReturn(null, "findOneAndUpdate");
        const response = await request(app)
          .put(`/api/product/${requestBody._id}`)
          .send({
            price: 100000,
          });
        expect(response.status).not.toBe(200);
      });

      it("Should catch exception if any error during db operation", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
        };

        mockingoose(Product).toReturn(
          new Error("Server Error"),
          "findOneAndUpdate"
        );
        const response = await request(app)
          .put(`/api/product/${requestBody._id}`)
          .send({
            price: 100000,
          });
        expect(response.status).not.toBe(200);
      });
    });
  });

  describe("DELETE Route", () => {
    describe("To delete a product", () => {
      it("Should give 200 status if product is deleted", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Test Product",
          price: 100000,
          featured: false,
          description: "",
          image: "testing.png",
          createdAt: new Date().toISOString(),
        };

        mockingoose(Product).toReturn(requestBody, "findOneAndDelete");
        const response = await request(app).delete(
          `/api/product/${requestBody._id}`
        );
        expect(response.status).toBe(200);
      });

      it("Should give 404 status if productId is not found", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
        };

        mockingoose(Product).toReturn(null, "findOneAndDelete");
        const response = await request(app).delete(
          `/api/product/${requestBody._id}`
        );
        expect(response.status).not.toBe(200);
      });

      it("Should catch exception if any error during db operation", async () => {
        const requestBody = {
          _id: new mongoose.Types.ObjectId().toString(),
        };

        mockingoose(Product).toReturn(
          new Error("Server Error"),
          "findOneAndDelete"
        );
        const response = await request(app).delete(
          `/api/product/${requestBody._id}`
        );
        expect(response.status).not.toBe(200);
      });
    });
  });
});
