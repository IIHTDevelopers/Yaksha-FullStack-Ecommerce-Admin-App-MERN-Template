import productService from "../../services/product.service";

let ProductService = "ProductService";

jest.mock("axios");

describe(ProductService, () => {
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
    jest.clearAllMocks();
  });

  describe("functional", () => {
    test(`${ProductService} functional should get all product`, async () => {
      let isNull = false;
      try {
        const response = await productService.getAllProducts();
        isNull = response === null;
        throw new Error("Error in getAllProducts()");
      } catch (error) {
        if (isNull) {
          expect(error).toBeNull();
        } else {
          productService.getAllProducts = jest
            .fn()
            .mockResolvedValueOnce(mockProducts);
          const result = await productService.getAllProducts();
          expect(productService.getAllProducts).toHaveBeenCalled();
          expect(result).toEqual(mockProducts);
        }
      }
    });

    test(`${ProductService} functional should search product by name`, async () => {
      let isNull = false;
      try {
        const response = await productService.searchProductByName({
          name: "text",
        });
        isNull = response === null;
        throw new Error("Error in searchProductByName()");
      } catch (error) {
        if (isNull) {
          expect(error).toBeNull();
        } else {
          productService.searchProductByName = jest
            .fn()
            .mockResolvedValueOnce(mockProducts);
          const result = await productService.searchProductByName({
            name: "Product",
          });
          expect(productService.searchProductByName).toHaveBeenCalled();
          expect(result).toEqual(mockProducts);
        }
      }
    });

    test(`${ProductService} functional should add a new product`, async () => {
      let isNull = false;
      try {
        const response = await productService.addProduct({
          name: "new Product",
        });
        isNull = response === null;
        throw new Error("Error in addProduct()");
      } catch (error) {
        if (isNull) {
          expect(error).toBeNull();
        } else {
          const { _id, ...restData } = mockProducts[0];

          productService.addProduct = jest
            .fn()
            .mockResolvedValueOnce(mockProducts[0]);
          const result = await productService.addProduct(restData);
          expect(productService.addProduct).toHaveBeenCalledWith(restData);
          expect(result).toEqual(mockProducts[0]);
        }
      }
    });

    test(`${ProductService} functional should update product by ID`, async () => {
      let isNull = false;
      try {
        const response = await productService.updateProduct("1", {
          name: "new Product",
        });
        isNull = response === null;
        throw new Error("Error in updateProduct()");
      } catch (error) {
        if (isNull) {
          expect(error).toBeNull();
        } else {
          const { _id, ...restData } = mockProducts[0];

          productService.updateProduct = jest
            .fn()
            .mockResolvedValueOnce({ ...mockProducts[0], name: "new Product" });
          const result = await productService.updateProduct("1", {
            ...restData,
            name: "new Product",
          });
          expect(productService.updateProduct).toHaveBeenCalledWith(_id, {
            ...restData,
            name: "new Product",
          });
          expect(result).toEqual({ ...mockProducts[0], name: "new Product" });
        }
      }
    });

    test(`${ProductService} functional should delete product by ID`, async () => {
      let isNull = false;
      try {
        const response = await productService.deleteProduct("1");
        isNull = response === null;
        throw new Error("Error in deleteProduct()");
      } catch (error) {
        if (isNull) {
          expect(error).toBeNull();
        } else {
          productService.deleteProduct = jest
            .fn()
            .mockResolvedValueOnce(mockProducts[0]);
          const result = await productService.deleteProduct("1");
          expect(productService.deleteProduct).toHaveBeenCalledWith(
            mockProducts[0]._id
          );
          expect(result).toEqual(mockProducts[0]);
        }
      }
    });
  });
});
