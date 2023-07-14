import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "../repository/product.repository";

describe("Product Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("product-1", "Product 1", 100);
    
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "product-1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "product-1",
      name: "Product 1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("product-1", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "product-1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "product-1",
      name: "Product 1",
      price: 100
    });

    product.changeName("Product XYZ");
    product.changePrice(200);

    await productRepository.update(product);
    const productModel2 = await ProductModel.findOne({ where: { id: "product-1" } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "product-1",
      name: "Product XYZ",
      price: 200
    });
  });

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("product-1", "Product 1", 100);
    
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "product-1" } });

    const foundProduct = await productRepository.findById("product-1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    
    const productA = new Product("product-a", "Product A", 100);
    const productB = new Product("product-b", "Product B", 200);
    const productC = new Product("product-c", "Product C", 300);
    
    const products = [productA, productB, productC];

    products.map(async product => {
      await productRepository.create(product);
    });
    
    const foundProducts = await productRepository.findAll();

    expect(products).toEqual(foundProducts);
  });
});