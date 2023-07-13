"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
describe("Address unit tests", () => {
    it("should throw error when street is empty", () => {
        expect(() => {
            const address = new address_1.default("", 1000, "94109", "San Francisco");
        }).toThrowError("Street is required");
    });
    it("should throw error when number is equal or less than zero", () => {
        expect(() => {
            const address = new address_1.default("Lombard Street", 0, "94109", "San Francisco");
        }).toThrowError("Number must be greater than zero");
        expect(() => {
            const address = new address_1.default("Lombard Street", -1, "94109", "San Francisco");
        }).toThrowError("Number must be greater than zero");
    });
    it("should throw error when zip is empty", () => {
        expect(() => {
            const address = new address_1.default("Lombard Street", 1000, "", "San Francisco");
        }).toThrowError("Zip is required");
    });
    it("should throw error when city is empty", () => {
        expect(() => {
            const address = new address_1.default("Lombard Street", 1000, "94109", "");
        }).toThrowError("City is required");
    });
});
