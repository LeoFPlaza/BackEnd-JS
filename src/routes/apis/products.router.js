import { Router } from 'express'
import { ProductManager } from '../../daos/ProductManager.js'
import productModel from '../../daos/Mongo/models/product.model.js'
import bodyParser from "body-parser"

const router = Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


const productManager = new ProductManager()


router.get('/', async (req, res) => {
    try {
        const { start = 0, limit = 0 } = req.query
        const products = await productModel.find({})
        res.send(products)
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: "not Found", data: "ups, something went wrong" })
    }
})


router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        res.json(await productModel.find({ _id: id }))
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: "not Found", data: "Product ID Not Found" })
    }

})


router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const updatedProductData = req.body
    //controlo que el pid este bien formado
    if (pid.length != 24) {
        return res.status(400).send({ status: "error", msg: "Product id must be 24 digits" })
    }
    if (updatedProductData.id) {
        return res.status(401).send({ status: "error", msg: "Product id can't be modified" })
    }
    try {

        const product = await productModel.findByIdAndUpdate(pid, updatedProductData, {
            new: true, // Devuelve el documento actualizado
        });
        if (!product) {//si no encuentra el documento
            console.error("producto no encontrado");
            return res.status(400).send("product not found")
        }
        console.log("Product successfully updated.");
        return res.status(200).json({ status: "ok", data: product }) // Devuelve el producto actualizado

        //return res.status(200).json({ status: "ok", data: await productManager.updateProduct(id, updatedContent) })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: "not Found", data: "Product ID Not Found" })

    }


})

router.post('/', async (req, res) => {
    //valido los campos obligatorios desde aqui para hacer un early return si falta alguno
    const { title, description, code, price, thumbnail, stock, category } = req.body;
    const status = req.body.status !== false ? true : req.body.status
    //console.log(newProd)
    console.log({ status: status, title: title, description: description, code: code, price: price, thumbnail: thumbnail, stock: stock, category: category })
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Missing required field Or fields' });
    }
    try {
        const productExists = await productModel.find({ code: code })
        if (productExists.length > 0) {
            return res.status(401).json({ error: 'product already exists' });
        }
        const result = productModel.create({
            title: title,
            description: description,
            code: code,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
            status: status,
            category: category
        })
        return res.status(200).json({ status: "ok", data: result })

    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: "not Found", data: "ups, something went wrong" })

    }
})

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    if (id.length != 24) {
        return res.status(400).send({ status: "error", msg: "product id must be 24 digits" })
    }
    try {
        const deleteProduct = await productModel.findByIdAndDelete(id)
        return res.status(200).json({ status: "ok", data:deleteProduct })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: "not Found", data: "Product ID Not Found" })
    }
})

export default router
