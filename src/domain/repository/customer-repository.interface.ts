import Customer from "../entity/customer";
import IRepository from "./interface/repository.interface";

export default interface ICustomerRepository extends IRepository<Customer> {}