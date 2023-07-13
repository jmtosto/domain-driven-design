import Order from "../entity/order";
import Customer from "../entity/customer";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService {

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("There must be at least one item");
    }
    
    const order = new Order(uuid(), customer.id, items);
    
    customer.addRewardPoints(0.1 * order.totalPrice);
    
    return order;
  }
  
  static calculateTotalOrderPrice(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.totalPrice, 0);
  }
}