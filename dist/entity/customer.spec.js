"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./customer"));
const address_1 = __importDefault(require("./address"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        // Arrange
        const customer = new customer_1.default("123", "John");
        //Act
        customer.changeName("Jane");
        // Assert 
        expect(customer.name).toBe("Jane");
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 1, "12345-678", "São Paulo");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should deactivate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
    it("should throw error on customer activation when address is undefined", () => {
        expect(() => {
            const customer = new customer_1.default("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});
