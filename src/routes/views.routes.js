import { Router } from "express";

const router = Router()

//rutas para la vista
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'E-comerce Leo', 
        name: 'loco Leo',
        style: 'index.css'
    })
})

router.get('/prod', (req, res)=>{

    res.render('products', {
        name : 'productos',
        title: 'listado de productos',
        style: 'products.css'
    })
})

export default router