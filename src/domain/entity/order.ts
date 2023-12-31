import OrderItem from "./order_item";

export default class Order {

  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
    this._total = this.calculateTotalPrice();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items length must be greater than zero");
    }
    return true;
  }

  calculateTotalPrice(): number {
    return this._items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  get totalPrice(): number {
    return this._total;
  }
}