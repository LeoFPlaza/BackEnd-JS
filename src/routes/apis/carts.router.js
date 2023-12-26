import { Router } from 'express'
import bodyParser from "body-parser"
import { CartManager } from '../../classes/Cart.js'

const router = Router()
const cartManager = new CartManager()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/', async  (req, res)=>{
    return res.status(200).json({ status: "ok", data: await cartManager.createNewCart()})
})

router.get('/:cid', async  (req, res)=>{
    const id =parseInt(req.params.cid)
    const cart = await cartManager.getCart(id)
        res.json(cart)
})

//lo puse en un metodo put porque me parecio que si estoy agregando productos a un arreglo dentro del carrito existente es mas un update que un insert
router.put('/:cid/:pid', async  (req, res)=>{
    const {cid, pid} =req.params
    const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
        res.status(200).json({status: cart, msg:cart})
})

export default router
