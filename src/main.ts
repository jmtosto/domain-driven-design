import Customer from './entity/customer';
import Address from './entity/address';
import OrderItem from './entity/order_item';
import Order from './entity/order';

let customer = new Customer("customer-1", "João Tosto");
const address = new Address("Lombard Street", 1000, "94109", "San Francisco");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("item-1", "product-1", "Item 1", 1, 50);
const item2 = new OrderItem("item-2", "product-2", "Item 2", 2, 100);
const order = new Order("order-1", "customer-1", [item1, item2]);