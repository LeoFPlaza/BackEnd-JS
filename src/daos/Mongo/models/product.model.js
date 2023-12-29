import { Schema, model } from "mongoose";

const productColection = 'products'

const productSchema = Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    code: {
        type:String,
        required: true,
        unique: true
    },
    price:Number,
    thumbnail: String,
    stock: {
        type:Number,
        required: true
    },
    category: String,
    status:{ 
        type:Boolean, 
        required: true
    }
})

const productModel = model(productColection, productSchema)

export default productModel