import Order from "../entity/order";

export default class OrderService {

  static calculateTotalOrderPrice(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.totalPrice, 0);
  }
}