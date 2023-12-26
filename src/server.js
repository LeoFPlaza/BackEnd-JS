import express from 'express'
import bodyParser from "body-parser"
import productManagerRouter from './routes/apis/products.router.js'
import cartsRouter from "./routes/apis/carts.router.js";
import viewsRouter from "./routes/views.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = 8080


//plantillas
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', __dirname + '/views')


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/views', viewsRouter)
app.use('/api/products', productManagerRouter)
app.use('/api/carts', cartsRouter)
// app.use('/static',express.static(__dirname + '/public'))

app.use((err, req, res, next) => {
    console.error('error: ', err.stack)
    res.status(500).send('Error no manejado')
    next()
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})


