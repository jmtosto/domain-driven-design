import Product from "../entity/product";

export default class ProductService {

  static changePricesByRate(products: Product[], rate: number): Product[] {
    products.forEach(product => {
      product.changePrice(product.price * rate);
    })
    return products;
  }
}