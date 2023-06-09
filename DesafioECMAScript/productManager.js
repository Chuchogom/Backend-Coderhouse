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
  updateProduct = (id, title, description, price, thumbnail, stock) => {
    const product = this.products.find(product => product.id === id)
    if (product) {
      product.title = title
      product.description = description
      product.price = price
      product.thumbnail = thumbnail
      product.stock = stock
    } else {
      throw new Error('Product not found')
    }
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

}

const productManager = new ProductManager()
productManager.addProduct("Bycicle","Mountain Bycicle",299,"https://m.media-amazon.com/images/I/71qMz+mUekL._AC_SX679_.jpg",33)
//productManager.addProduct("","Mountain Bycicle",299,"https://m.media-amazon.com/images/I/71qMz+mUekL._AC_SX679_.jpg",33)

console.log(productManager.getProductById(1))
console.log(productManager.getProductById(5))
