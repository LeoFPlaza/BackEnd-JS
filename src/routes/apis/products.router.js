import { Router } from 'express'
import { ProductManager } from '../../classes/ProductManager.js'
import bodyParser from "body-parser"

const router = Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


/** */
//////////////Version usando la clase ProductManager como archivo a parte//////////////

const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const { start = 0, limit = 0 } = req.query

    //incluyo la opcion de recibir por query los valores pid y code para busquedas de productos especificos como opcion extra


    // const { pid, code } = req.query
    // if (code) {
    //    return res.json(await productManager.getProductByCode(code))
    // } else if (pid) {
    //    return res.json(await productManager.getProductById(pid))
    // } else {
    //    return res.json(await productManager.getProducts(parseInt(start), parseInt(limit)))
    // }

    res.json(await productManager.getProducts(parseInt(start), parseInt(limit)))

})


router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    res.json(await productManager.getProductById(id))
})


router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const updatedContent =  req.body
    //console.log(newProd)

    return res.status(200).json({ status: "ok", data: await productManager.updateProduct(id, updatedContent)})
})

router.post('/', async (req, res) => {
    //valido los campos obligatorios desde aqui para hacer un early return si falta alguno
    const { title, description, code, price, thumbnail, stock, status, category } = req.body;
    //console.log(newProd)
    if (!title || !description || !code  || !price  || !stock || !status || !status) {
        return res.status(400).json({ error: 'Missing required field Or fields' });
      }
    
    return res.status(200).json({ status: "ok", data: await productManager.addProduct(title, description, code, price, thumbnail, stock, status, category)})
})

router.delete('/:pid', async(req, res) =>{
    const id = parseInt(req.params.pid)
    const deleteProduct = await productManager.deleteProductById(id)
    if(deleteProduct === 400){
        return res.status(400).json({status:"not Found", data: "Product ID Not Found"})   
    }else{
    return res.status(200).json({status:"ok", data: deleteProduct})
    }
})

export default router
