import mongoose from "mongoose";


export interface categoryDocument extends mongoose.Document {
    title: string,
    slug: string,
    createdAt: Date,
    updatedAt: Date
}

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
}, { timestamps: true })

const categoryModel = mongoose.model<categoryDocument>("Category", categorySchema)

export default categoryModel;