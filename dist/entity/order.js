"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
        this._total = this.calculateTotalPrice();
    }
    validate() {
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
    calculateTotalPrice() {
        return this._items.reduce((acc, item) => acc + item.totalPrice, 0);
    }
    get totalPrice() {
        return this._total;
    }
}
exports.default = Order;
