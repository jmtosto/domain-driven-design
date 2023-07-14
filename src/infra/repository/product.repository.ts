import IProductRepository from "../../domain/repository/product-repository.interface"
import Product from "../../domain/entity/product";
import ProductModel from "../database/sequelize/model/product.model";

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Product> {
    const entity = await ProductModel.findOne({ where: { id } });
    
    return new Product(entity.id, entity.name, entity.price);
  }

  async findAll(): Promise<Product[]> {
    const entities = await ProductModel.findAll();

    return entities.map(entity => {
      return new Product(entity.id, entity.name, entity.price);
    });
  }
}