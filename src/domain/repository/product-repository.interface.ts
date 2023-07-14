import Product from "../entity/product";
import IRepository from "./interface/repository.interface";

export default interface IProductRepository extends IRepository<Product> {}