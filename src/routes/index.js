import { Router } from "express"
import viewsRouter from './views.routes.js'
import cartsRouter from './apis/carts.router.js'
import productManagerRouter from './apis/products.router.js'



const router = Router()


router.use('/', viewsRouter)
router.use('/api/products', productManagerRouter)
router.use('/api/carts', cartsRouter)

export default router