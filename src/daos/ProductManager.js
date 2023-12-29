import fs from 'fs'

const path = './src/files/productsManager.json'

class ProductManager {
    static contentParse = []
    constructor() {
        this.products = ProductManager.products
        this.load = ProductManager.getData()
    }

    static async getData() {
        let res
        if (fs.existsSync(path)) {
            this.contentParse = await fs.promises.readFile(path, 'utf-8')
            res = "Archivo cargado exitosamente."
            console.log(res)
        } else {
            await fs.promises.writeFile(path, "[]")
            this.contentParse = await fs.promises.readFile(path, 'utf-8')
            res = "Archivo creado exitosamente."
            console.log(res)
        }
        return res
    }

    async getProducts(start, limit) {
        const content = await fs.promises.readFile(path, 'utf-8')
        const contentParse = await JSON.parse(content)
        start = parseInt(start) < 0 ? 0 : parseInt(start)
        limit = parseInt(limit) < 0 ? 0 : parseInt(limit)
        if (limit === 0 || start > limit || start > contentParse.length) {
            console.log("GET/ getProducts full array")
            //console.log(contentParse)
            return contentParse;
        }
        if (limit > contentParse.length) {
            console.log("GET/ getProducts, with only start:", start)
            console.log(contentParse.slice(start))
            return contentParse.slice(start);
        }
        console.log("GET/ getProducts limited, start:", start, "limit:", limit + 1)
        //console.log(contentParse.slice(start, limit + 1))
        return contentParse.slice(start, limit + 1);
    }

    async getProductById(pid) {
        const content = await fs.promises.readFile(path, 'utf-8')
        const contentParse = JSON.parse(content)
        let productFound = contentParse.find(product => product.id == parseInt(pid))//"Id Product Not Found."
        if(!productFound){
            productFound = "Id Product Not Found."
        }

        console.log("GET/ getProductById:", pid)
        //console.log(productFound)
        return productFound
    }

    async updateProduct(id, updatedProductData) {
        let res = "Product ID Not Found"
        if (updatedProductData.id) {
            res = "Product ID can't be changed."
            console.log(res)
            return res
        } else {
            const content = await fs.promises.readFile(path, 'utf-8');
            const contentParse = JSON.parse(content);

            const productIndex = contentParse.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.error(res);
                return res;
            }

            const updatedProduct = {
                ...contentParse[productIndex],
                ...updatedProductData,
            };

            contentParse[productIndex] = updatedProduct;

            await fs.promises.writeFile(path, JSON.stringify(contentParse, null, 2));
            res = "Product successfully updated."
            console.log(res);
            return res
        }
    }


    async addProduct(title, description, code, price, thumbnail, stock, status, category) {
        //como el campo status es obligatorio agrego el operador ternario aqui para que siempre que no sea deliveradamente false el valor para esa llave sea true
        status = status !== false ? true : status
        const content = await fs.promises.readFile(path, 'utf-8')
        const contentParse = JSON.parse(content)
        const ProductExists = contentParse.some((product) => product.code === code);
        let highestId = contentParse.length > 0 ? Math.max(...contentParse.map(item => item.id)) : 0
        const newProd = { id: ++highestId, title: title, description: description, code: code, price: price, thumbnail: thumbnail, stock: stock, status: status, category: category }
        let res = "Ya existe un producto con el codigo: " + code

        if (!ProductExists) {

            contentParse.push(newProd)
            const finalContent = JSON.stringify(contentParse, null, 2)
            fs.promises.writeFile(path, finalContent)

            res = "Producto agregado correctamente."

        }

        console.log(res)
        return res
    }

    async deleteProductById(id) {
        const content = await fs.promises.readFile(path, 'utf-8')
        const contentParse = JSON.parse(content)
        const ProductExists = contentParse.some((product) => product.id === id);
        let res = 400

        if (ProductExists) {
            const newProducts = contentParse.filter((product) => product.id !== id);
            await fs.promises.writeFile(path, JSON.stringify(newProducts, null, 2));
            res = "producto eliminado."
            return res
        }

        console.log(res)
        return res
    }

    deleteDataStorage() {
        fs.unlinkSync(path)
        console.log("File succesfully deleted.")
    }
}

export { ProductManager }
