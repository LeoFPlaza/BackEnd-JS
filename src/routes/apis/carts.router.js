import { Router } from 'express'
import bodyParser from "body-parser"
import { CartManager } from '../../daos/Cart.js'
import cartModel from '../../daos/Mongo/models/cart.model.js'

const router = Router()
const cartManager = new CartManager()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find({})
        res.send(carts)
    } catch (err) {
        console.error(err)
    }

})

router.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const cart = await cartModel.find({ _id: id })
        res.json(cart)
    } catch (err) {
        console.error(err)
    }

})


router.post('/', async (req, res) => {
    const { uid, pid, quantity } = req.body

    try {
        const result = await cartModel.create(
            {
                userId: uid,
                isActive: true,
                products: [
                    {
                        productId: pid,
                        quantity: quantity
                    }
                ]
            }
        )
        return res.status(200).json({ status: "ok", data: result })
    } catch (err) {
        console.error(err)
    }
})

//lo puse en un metodo put porque me parecio que si estoy agregando productos a un arreglo dentro del carrito existente es mas un update que un insert
router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { pid, quantity } = req.body
    //me fijo que el cid este bien formado
    if (cid.length != 24) {
        return res.status(400).send({ status: "error", msg: "cart id must be 24 digits" }) 
    }
    try {
    //busco el carrito y lo guardo en una variable, de este modo sabre si el producto ya está en el carrito
        const cart = await cartModel.findById(cid)
        //busco en el carrito el prod. si no lo encuentro lo agrego al carrito
        if (!cart.products.find(product => product.productId === pid)) {
            cart.products.push({
                productId: pid,
                quantity,
            });
        } else {
            // Si el producto ya se encuentra en el carrito, sumo la cantidad

            const productIndex = cart.products.findIndex(product => product.productId === pid);
            cart.products[productIndex].quantity = quantity;
        }

        await cart.save();
        //const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
        res.status(200).send({ status: "Ok", msg: cart })
    } catch (err) {
        console.error(err)
        return res.status(400).send("cart not found")
    }

})

export default router
