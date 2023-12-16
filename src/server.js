import express from 'express'
import bodyParser from "body-parser"
import productManagerRouter from './routes/products.router.js'
import cartsRouter  from "./routes/carts.router.js";

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/products',productManagerRouter)
app.use('/api/carts',cartsRouter)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})