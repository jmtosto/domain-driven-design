import Customer from './customer';
import Address from './address';

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
     expect(() => {
       let customer = new Customer("", "John");
     }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    //Act
    customer.changeName("Jane");

    // Assert 
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345-678", "São Paulo");
    
    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error on customer activation when address is undefined", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("customer", "Customer");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
})