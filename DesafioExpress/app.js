import express from 'express';
import ProductManager from './src/productManager.js';

const app = express()
app.use(express.json())
const productManager = new ProductManager()

// Homepage
app.get('/', (req,res) => {
    res.send('Welcome Homepage')
})

// Get all th products
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts(limit)
        res.json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Add a new product
app.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, stock } = req.body
    await productManager.addProduct(
        title, description, price, thumbnail, stock
    )
    res.json({status: 'success', message: 'Product added succesfully'})
})

//Get a product by id
app.get('products/:id', async (req,res)=>{
    const productId = req.params.id
    const product =  await productManager.getProductById(productId)
    res.send(product)
})

//Update a product by id
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id
    const updatedProduct = req.body
    await productManager.updateProduct(productId, updatedProduct)
    res.json({status: 'success', message: 'Product updated successfully'})
})

//Delete a product by id
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id
    await productManager.deleteProduct(productId)
    res.json({status: 'sucsess', message: 'Product deleted'})
})


//Server
const port = 8080;
app.listen(8080, () => console.log(`Server running on port ${port}`))