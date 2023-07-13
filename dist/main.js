"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./entity/customer"));
const address_1 = __importDefault(require("./entity/address"));
const order_item_1 = __importDefault(require("./entity/order_item"));
const order_1 = __importDefault(require("./entity/order"));
let customer = new customer_1.default("customer-1", "João Tosto");
const address = new address_1.default("Lombard Street", 1000, "94109", "San Francisco");
customer.Address = address;
customer.activate();
const item1 = new order_item_1.default("item-1", "product-1", "Item 1", 1, 50);
const item2 = new order_item_1.default("item-2", "product-2", "Item 2", 2, 100);
const order = new order_1.default("order-1", "customer-1", [item1, item2]);
