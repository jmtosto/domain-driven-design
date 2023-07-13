"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, productId, name, qty, price) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._qty = qty;
        this._price = price;
        this.validate();
    }
    validate() {
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
    get qty() {
        return this._qty;
    }
    get price() {
        return this._price;
    }
    get totalPrice() {
        return this._qty * this._price;
    }
}
exports.default = OrderItem;
