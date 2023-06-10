import fs from "fs"

class ProductManager {

  constructor() {
    this.products = []
  }

  //Get all the products
  getProducts = () => {
    return this.products
  }

  //Search a product by id
  productId = () => {
    const count = this.products.length
    const nextId = (count > 0) ? this.products[count - 1].id + 1 : 1
    return nextId
  }

  //Add a new product
  addProduct = (title, description, price, thumbnail, stock) => {
    const id = this.productId()
    const code = `PRD-${this.productId()}`
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock: stock === undefined ? 50 : stock
    }

    // Check if all parameters are defined
    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      stock === undefined ||
      code === undefined
    ) {
      throw new Error('All arguments are required')
    }

    // Check if the code already exists
    const productWithSameCode = this.products.find(
      (product) => product.code === code
    )
    if (productWithSameCode) {
      throw new Error('The code already exists')
    }

    // Check if the stock is negative
    if (stock < 0) {
      throw new Error('Stock cannot be negative')
    }

    // Check if any of the variables are empty
    if (title === '' || description === '' || price === '' || thumbnail === '') {
      throw new Error('All arguments must be non-empty')
    }

    this.products.push(product)
  }

  //Get all the product info with an id
  getProductById = (productId) => {
    const product = this.products.find(product => product.id == productId)

    if (product == undefined) {
      return "Product Not Found"
    }

    return product
  }

  // Modify a product
  updateProduct = async (productId, updatedProduct) => {
    const index = this.products.findIndex((product) => product.id == productId);

    if (index === -1) {
      return "Product Not Found";
    }

    this.products[index] = { ...this.products[index], ...updatedProduct };
    await this.saveProductsToFile();
  }

  // Delete a product
  deleteProduct = (id) => {
    const product = this.products.find(product => product.id === id)
    if (product) {
      this.products.splice(this.products.indexOf(product), 1)
    } else {
      throw new Error('Product not found')
    }
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile('products.json');
      const products = JSON.parse(data);
      this.products = [...this.products, ...products];
    } catch (error) {
      console.error(error);
    }
  }

  async saveProductsToFile() {
    try {
      await fs.writeFile('products.json', JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error(error);
    }
  }

}

const productManager = new ProductManager()
productManager.addProduct("Bycicle","Mountain Bycicle",299,"https://m.media-amazon.com/images/I/71qMz+mUekL._AC_SX679_.jpg",33)
productManager.addProduct("Bycicle City","City Bycicle",299,"No Image",33)

console.log(productManager.getProductById(1))
console.log(productManager.getProductById(5))

const updatedProduct ={
  title:'Product Test',
  price: 99.99
}
productManager.updateProduct(2,updatedProduct);

productManager.deleteProduct(2);