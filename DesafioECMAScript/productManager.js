class ProductManager {
    
    constructor () {
        this.products = []
    }

    getProducts = () => {
        return this.products
    }

    productId = () => {
        const count = this.products.length 
        const nextId = (count > 0) ? this.products[count-1].id + 1 : 1
        return nextId
    }

    addProduct = (title, description, price,thumbnail,stock) => {
        const id = this.productId()
        const code = `PRD-${this.productId()}`
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code, 
            stock: stock ?? 50
        }
        this.products.push(product)
    }

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
