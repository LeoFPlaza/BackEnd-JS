import { Schema, model } from "mongoose";

const cartColection = 'carts'

const cartSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                unique: true
            },
            quantity: Number, 
            _id: false
        }
    ]
})

const cartModel = model(cartColection, cartSchema)

export default cartModel