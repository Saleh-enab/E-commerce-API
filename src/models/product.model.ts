import mongoose from "mongoose";
import { categoryDocument } from './category.model'

export interface ProductDocument extends mongoose.Document {
    title: string,
    category: categoryDocument["_id"],
    description: string,
    price: number,
    image: string,
    createdAt: Date,
    updatedAt: Date
}


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }

}, { timestamps: true })


const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)

export default ProductModel;