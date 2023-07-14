import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Service unity tests", () => {

  it("should change the price of a product list", () => {
    const product1 = new Product("product-1", "Product 1", 100);
    const product2 = new Product("product-2", "Product 2", 200);
    const products = [product1, product2];

    ProductService.changePricesByRate(products, 1.5);

    expect(product1.price).toBe(150);
    expect(product2.price).toBe(300);
  })
})