const fs = require('fs')

class ProductManager {
    static contentParse = []
    constructor() {
        this.products = ProductManager.products
        this.path = ProductManager.getData()
    }

    static async getData() {
        let res
        if (fs.existsSync('productManager.json')) {
            this.contentParse = await fs.promises.readFile('productManager.json', 'utf-8')
            res = "Archivo cargado exitosamente."
            console.log(res)
        } else {
            await fs.promises.writeFile('productManager.json', "[]")
            this.contentParse = await fs.promises.readFile('productManager.json', 'utf-8')
            res = "Archivo creado exitosamente."
            console.log(res)
        }
        return res
    }
    async getProducts() {
        const content = await fs.promises.readFile('productManager.json', 'utf-8')
        const contentParse = await JSON.parse(content)
        return contentParse;
    }

    async addProduct(title, description, code, price, thumbnail, stock) {

        const content = await fs.promises.readFile('productManager.json', 'utf-8')
        const contentParse = JSON.parse(content)
        const ProductExists = contentParse.some((product) => product.code === code);
        let highestId = contentParse.length > 0 ? Math.max(...contentParse.map(item => item.id)) : 0
        const newProd = { id: ++highestId, title: title, description: description, code: code, price: price, thumbnail: thumbnail, stock: stock }
        let res = "Ya existe un producto con el codigo: " + code

        if (!ProductExists) {

            contentParse.push(newProd)
            const finalContent = JSON.stringify(contentParse, null, 2)
            fs.promises.writeFile('productManager.json', finalContent)
            
            res = "Producto agregado correctamente."

        }

        console.log(res)
    }

    async getProductById(id) {
        const content = await fs.promises.readFile('productManager.json', 'utf-8')
        const contentParse = JSON.parse(content)
        let productFound = "Id Product Not Found."

        contentParse.forEach(element => {
            if (element.id == id) {
                productFound = element
            }
        });

        return productFound
    }

    async getProductByCode(code) {
        const content = await fs.promises.readFile('productManager.json', 'utf-8')
        const contentParse = JSON.parse(content)
        let productFound = "Code Product Not Found."

        contentParse.forEach(element => {
            if (element.code == code) {
                productFound = element
            }
        });

        return productFound
    }


    async deleteProductById(id) {
        const content = await fs.promises.readFile('productManager.json', 'utf-8')
        const contentParse = JSON.parse(content)
        const ProductExists = contentParse.some((product) => product.id === id);
        let res = "Product ID Not Found."

        if (ProductExists) {
            const newProducts = contentParse.filter((product) => product.id !== id);
            await fs.promises.writeFile('productManager.json', JSON.stringify(newProducts, null, 2));
            res = "producto eliminado."
        }

        console.log(res)
        return res
    }

    async updateProduct(id, updatedProductData) {
        let res = "Product ID Not Found"
        if (updatedProductData.id) {
            res = "Product ID can't be changed."
            console.log(res)
            return res
        } else {
            const content = await fs.promises.readFile('productManager.json', 'utf-8');
            const contentParse = JSON.parse(content);

            const productIndex = contentParse.findIndex((product) => product.id === id);
            if (productIndex == -1) {
                console.error(res);
                return res;
            }

            const updatedProduct = {
                ...contentParse[productIndex],
                ...updatedProductData,
            };

            contentParse[productIndex] = updatedProduct;

            await fs.promises.writeFile('productManager.json', JSON.stringify(contentParse, null, 2));
            res = "Product successfully updated."
            console.log(res);
            return res
        }
    }

    deleteDataStorage() {
        fs.unlinkSync('productManager.json')
        console.log("File succesfully deleted.")
    }
}
