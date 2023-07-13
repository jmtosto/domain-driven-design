import OrderItem from "./order_item";

describe("Order Item unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("", "product-1", "Item 1", 2, 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when productId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("item-1", "", "Item 1", 2, 100);
    }).toThrowError("ProductId is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("item-1", "product-1", "", 2, 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when qty is equal or less than zero", () => {
    expect(() => {
      const orderItem = new OrderItem("item-1", "product-1", "Item 1", 0, 100);
    }).toThrowError("Qty must be greater than zero");

    expect(() => {
      const orderItem = new OrderItem("item-1", "product-1", "Item 1", -1, 100);
    }).toThrowError("Qty must be greater than zero");
  });

  it("should throw error when price is equal or less than zero", () => {
    expect(() => {
      const orderItem = new OrderItem("item-1", "product-1", "Item 1", 1, 0);
    }).toThrowError("Price must be greater than zero");

    expect(() => {
      const orderItem = new OrderItem("item-1", "product-1", "Item 1", 1, -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should calculate totalPrice correctly", () => {
    const orderItem = new OrderItem("item-1", "product-1", "Item 1", 2, 100);
    expect(orderItem.totalPrice).toBe(200);
  });
})