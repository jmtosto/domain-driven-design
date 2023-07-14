import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items length is zero", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrowError("Items length must be greater than zero");
  });

  it("should calculate order total price correctly", () => {
    const item1 = new OrderItem("item-1", "product-1", "Item 1", 1, 50);
    const item2 = new OrderItem("item-2", "product-2", "Item 2", 2, 100);
    const item3 = new OrderItem("item-3", "product-3", "Item 3", 3, 200);
    
    const order1 = new Order("order-1", "customer-id", [item1]);
    const order2 = new Order("order-2", "customer-id", [item1, item2]);
    const order3 = new Order("order-3", "customer-id", [item1, item2, item3]);
    
    expect(order1.totalPrice).toBe(50);
    expect(order2.totalPrice).toBe(250);
    expect(order3.totalPrice).toBe(850);
  });
})