import express from 'express'
import { ProductManager } from './src/classes/ProductManager.js'
import fs from 'fs'



const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))


/** */
 ////////////////Version usando la clase ProductManager como archivo a parte//////////////

const productManager = new ProductManager()


app.get('/products', async (req, res) => {
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


app.get('/products/:pid', async (req, res) => {
    const id = req.params.pid;
    res.json(await productManager.getProductById(id))
})
 

/* 

///////////////version con la clase ProductManager dentro del mismo archivo//////////////




class ProductManager {
    static contentParse = []
    constructor() {
        this.products = ProductManager.products
        this.path = ProductManager.getData()
    }

    static async getData() {
        let res
        if (fs.existsSync('./src/files/productManager.json')) {
            this.contentParse = await fs.promises.readFile('./src/files/productManager.json', 'utf-8')
            res = "Archivo cargado exitosamente."
            console.log(res)
        } else {
            await fs.promises.writeFile('./src/files/productManager.json', "[]")
            this.contentParse = await fs.promises.readFile('./src/files/productManager.json', 'utf-8')
            res = "Archivo creado exitosamente."
            console.log(res)
        }
        return res
    }
}

const productManager = new ProductManager()


app.get('/products', async (req, res) => {
    let { start, limit } = req.query
    const content = await fs.promises.readFile('./src/files/productManager.json', 'utf-8')
    const contentParse = await JSON.parse(content)

    start = parseInt(start) < 0 ? 0 : parseInt(start)
    limit = parseInt(limit) < 0 ? 0 : parseInt(limit)

    if (limit == 0 || start > limit || start > contentParse.length) {
        return res.json(contentParse);
    }
    if (limit > contentParse.length) {
        return res.json(contentParse.slice(start));
    }
    return res.json(contentParse.slice(start, limit + 1));

})


app.get('/products/:pid', async (req, res) => {
    const id = req.params.pid;
    const content = await fs.promises.readFile('./src/files/productManager.json', 'utf-8')
    const contentParse = JSON.parse(content)
    let productFound = "Id Product Not Found."

    contentParse.forEach(element => {
        if (element.id == id) {
            productFound = element
        }
    });

    return res.json(productFound) 
   
})
*/



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})