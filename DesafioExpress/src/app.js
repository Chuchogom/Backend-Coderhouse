import express from 'express';

const app = express()
app.use(express.json())
const port = 8080;

let products = []

app.get('/', (req,res) => {
    res.send('Welcome Homepage')
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const product = req.body

    products.push(product)
    res.json({status: 'success', message: 'Product created'})
})

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const product = req.body
    const productIdx = products.findIndex(p => p.id === id)
    if(productIdx < 0 || productIdx === 0) {
        return res.status(404).json({status: "error", message: 'Product Not Found'})
    }
    products[productIdx] = product
    res.json({status: 'success', message: 'Product Updated'})
})

app.delete('/products/:id', (req, res) => {

})

app.listen(8080, () => console.log(`Server running on port ${port}`))