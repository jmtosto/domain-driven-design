import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import CustomerRepository from "../repository/customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    let customer = new Customer("customer-1", "Customer 1");
    customer.Address = new Address("Lombard Street", 1001, "94109", "San Francisco");

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "customer-1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      reward_points: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    let customer = new Customer("customer-1", "Customer 1");
    customer.Address = new Address("Lombard Street", 1001, "94109", "San Francisco");

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.changeAddress(new Address("Fifth Avenue", 1, "10003", "New York"))
    customer.deactivate();
    customer.addRewardPoints(10);

    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "customer-1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "customer-1",
      name: customer.name,
      active: customer.isActive(),
      reward_points: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    let customer = new Customer("customer-1", "Customer 1");
    customer.Address = new Address("Lombard Street", 1001, "94109", "San Francisco");

    await customerRepository.create(customer);
    const foundCustomer = await customerRepository.findById(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should throw error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    
    expect(async () => {
      await customerRepository.findById("invalid-id");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    
    let customerA = new Customer("customer-a", "Customer A");
    let customerB = new Customer("customer-b", "Customer B");
    let customerC = new Customer("customer-c", "Customer C");
    
    customerA.Address = new Address("Street A", 1, "Zipcode A", "City A");
    customerB.Address = new Address("Street B", 2, "Zipcode B", "City B");
    customerC.Address = new Address("Street C", 3, "Zipcode C", "City C");

    const customers = [customerA, customerB, customerC];

    customers.map(async customer => {
      await customerRepository.create(customer);
    });

    const foundCustomers = await customerRepository.findAll();

    expect(customers).toStrictEqual(foundCustomers);
  });
});