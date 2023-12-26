import express from 'express'
import handlebars from 'express-handlebars'
import bodyParser from "body-parser"
import { Server } from 'socket.io';
import path from 'path';
import productManagerRouter from './routes/apis/products.router.js'
import cartsRouter from "./routes/apis/carts.router.js";
import viewsRouter from "./routes/views.routes.js";
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = 8080

const httpServer = app.listen(port, err => {
    if (err) console.log(err)
    console.log(`Server is listening on port ${port}`)
})

const io = new Server(httpServer)
io.on('connection', socket => {
    console.log('SocketSever is connected and listening')

    socket.on('getMsg', data => {
        console.log(data)
    })
})

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
app.use('/', viewsRouter)
app.use('/api/products', productManagerRouter)
app.use('/api/carts', cartsRouter)
// app.use('/static',express.static(__dirname + '/public'))

app.use((err, req, res, next) => {
    console.error('error: ', err.stack)
    res.status(500).send('Error no manejado')
    next()
})

