import OrderService from "./order.service";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Customer from "../entity/customer";

describe("Order Service unity tests", () => {
  it("should calculate the total price of an order list", () => {
    const item1 = new OrderItem("item-1", "product-1", "Item 1", 1, 100);
    const item2 = new OrderItem("item-2", "product-2", "Item 2", 2, 200);

    expect(item1.totalPrice).toBe(100)
    expect(item2.totalPrice).toBe(400)
    
    const order1 = new Order("order-1", "customer-1", [item1]);
    const order2 = new Order("order-2", "customer-2", [item1, item2]);

    expect(order1.totalPrice).toBe(100)
    expect(order2.totalPrice).toBe(500)

    const totalPriceA = OrderService.calculateTotalOrderPrice([order1]);
    const totalPriceB = OrderService.calculateTotalOrderPrice([order1, order2]);
    
    expect(totalPriceA).toBe(100);
    expect(totalPriceB).toBe(600);
  });

  it("should place an order and assign reward points to the customer", () => {
    const customer = new Customer("customer-1", "Customer 1");
    
    const item1 = new OrderItem("item-1", "product-1", "Item 1", 2, 50);
    const item2 = new OrderItem("item-2", "product-2", "Item 2", 1, 100);

    const order = OrderService.placeOrder(customer, [item1, item2]);

    expect(order.totalPrice).toBe(200);
    expect(customer.rewardPoints).toBe(20);
  })

  it("should throw error when items is empty", () => {
    expect(() => {
      const customer = new Customer("customer-1", "Customer 1");
      const order = OrderService.placeOrder(customer, []);
    }).toThrowError("There must be at least one item");
  })
});