class ProductManager {
    
    constructor () {
        this.products = []
    }

    //Get all the products
    getProducts = () => {
        return this.products
    }

    //Search a product by id
    productId = () => {
        const count = this.products.length 
        const nextId = (count > 0) ? this.products[count-1].id + 1 : 1
        return nextId
    }

    //Add a new product
    addProduct = (title, description, price, thumbnail, code, stock) => {
      const id = this.productId()
      const code = `PRD-${this.productId()}`
      const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock: stock ?? 50,
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

      this.products.push(product)
    }

    //Get all the product info with an id
    getProductById = (productId) => {
        const product = this.products.find(product => product.id == productId)

        if(product == undefined) {
            return "Product Not Found"
        }

        return product
    }
}

const productManager = new ProductManager()
productManager.addProduct("Bicycle","Mountain Bicycle", 215, "https://m.media-amazon.com/images/I/71qMz+mUekL._AC_SX679_.jpg",35)

console.log(productManager.getProductById(1))
console.log(productManager.getProductById(5))
