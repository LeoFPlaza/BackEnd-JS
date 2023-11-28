import fs from 'fs'

class CartManager {
    static contentParse = []
    constructor() {
        this.path = './src/files/carts.json'
    }

    async loadCart() {
        if (!fs.existsSync('./src/files/carts.json')) {
            await fs.promises.writeFile('./src/files/carts.json', "[]")
            this.contentParse = await fs.promises.readFile('./src/files/carts.json', 'utf-8')
            console.log("Archivo Cart creado exitosamente.")
        }
        return this.contentParse = JSON.parse(await fs.promises.readFile('./src/files/carts.json', 'utf-8'))
    }

    async createNewCart() {
        const carts = await this.loadCart()
        console.log(carts.length)
        let highestId = carts.length > 0 ? Math.max(...carts.map(item => item.id)) : 0
        const newCart = { id: ++highestId, products: [] }
        console.log(carts)
        carts.push(newCart)
        const finalContent = JSON.stringify(carts, null, 2)
        const res = fs.promises.writeFile(this.path, finalContent)
        return res
    }

    async getCart(cid) {
        const carts = await this.loadCart()
        const cart = carts.find(cart => cart.id === parseInt(cid))
        console.log(carts)
        if (!cart) {
            return "No se encuentra el carrito"
        } else {
            return cart
        }
    }

    async addProductToCart(cid, pid) {
        const carts = await this.loadCart()
        const cartIndex = carts.findIndex(cart => cart.id === cid)
        const cartProds = carts[cartIndex].products
        const ProductExists = cartProds.some((product) => product.productId === pid);
        console.log(cartProds[0].productId)

        if (cartIndex === -1) {
            return "Carrito no encontrado"
        }
        if(!ProductExists){
        carts[cartIndex].products = cartProds.concat([{productId: pid, quantity: 1}])
        const res = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return res
        }else{
            const productIndex = cartProds.findIndex((product) => product.productId === pid);
            console.log(cartProds[productIndex].quantity)
            const oneMoreProd = {
                ...cartProds[productIndex].quantity++,
            };
            carts[productIndex] = oneMoreProd;
            const res = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return res
        }
    }
}

export { CartManager }



