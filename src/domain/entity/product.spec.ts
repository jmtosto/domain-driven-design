import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("product-1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is equal or less than zero", () => {
    expect(() => {
      const product = new Product("product-1", "Product 1", 0);
    }).toThrowError("Price must be greater than zero");

    expect(() => {
      const product = new Product("product-2", "Product 2", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name correctly", () => {
    const product = new Product("product-1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price correctly", () => {
    const product = new Product("product-1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
})