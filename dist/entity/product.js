"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validade();
    }
    validade() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price <= 0) {
            throw new Error("Price must be greater than zero");
        }
        return true;
    }
    changeName(name) {
        this._name = name;
        this.validade();
    }
    changePrice(price) {
        this._price = price;
        this.validade();
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
}
exports.default = Product;
