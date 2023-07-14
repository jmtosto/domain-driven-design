import ICustomerRepository from "../../domain/repository/customer-repository.interface";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zipcode: entity.address.zip,
      active: entity.active,
      reward_points: entity.rewardPoints
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zipcode: entity.address.zip,
        active: entity.active,
        reward_points: entity.rewardPoints
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    let entity;

    try {
      entity = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }
    
    const customer = new Customer(id, entity.name);
    const address = new Address(
      entity.street,
      entity.number,
      entity.zipcode,
      entity.city
    );
    customer.changeAddress(address);
    customer.addRewardPoints(entity.reward_points);
    if (entity.active) customer.activate();

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    let entities;

    try {
      entities = await CustomerModel.findAll();
    } catch (error) {
      throw new Error("No customer not found");
    }
    
    const customers = entities.map(entity => {
      let customer = new Customer(entity.id, entity.name);
      const address = new Address(
        entity.street,
        entity.number,
        entity.zipcode,
        entity.city
      );
      customer.changeAddress(address);
      customer.addRewardPoints(entity.reward_points);
      if (entity.active) customer.activate();

      return customer;
    });

    return customers;
  }
}