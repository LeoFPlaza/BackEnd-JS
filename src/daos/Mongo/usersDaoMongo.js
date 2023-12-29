import cartModel from "./models/cart.model.js"

class CartDaoMongo {
    constructor(){
        this.model = cartModel
    }

    async getAllCarts(){
        try {
           return await this.model.find({})
        } catch (err) {
            console.error(err)
        }
    }

    async getCartById(cid){
        try {
            return await cartModel.find({ _id: cid })
        } catch (err) {
            console.error(err)
        }
    }

    async createCart(){
        try {
            
        } catch (error) {
            
        }
    }

    async updateCart(cid){
        try {
            
        } catch (error) {
            
        }
    }

    async deleteCart(cid){
        try {
            
        } catch (error) {
            
        }
    }
}

export default CartDaoMongo