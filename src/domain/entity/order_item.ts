export default class OrderItem {

  private _id: string;
  private _productId: string;
  private _name: string;
  private _qty: number;
  private _price: number;

  constructor(id: string, productId: string, name: string, qty: number, price: number) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._qty = qty;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._productId.length === 0) {
      throw new Error("ProductId is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._qty <= 0) {
      throw new Error("Qty must be greater than zero");
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    return true;
  }

  get qty(): number {
    return this._qty;
  }
  
  get price(): number {
    return this._price;
  }

  get totalPrice(): number {
    return this._qty * this._price;
  }
}