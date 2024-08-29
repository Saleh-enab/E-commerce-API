import { SchemaDefinition } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";
import { CustomError } from "../utils/errorHandler";
import categoryModel from "../models/category.model";

export const createProduct = async (data: SchemaDefinition<ProductDocument>) => {
    try {
        const product = await ProductModel.create(data)
        return product;
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}

export const findProductByCategory = async (categorySlug: string) => {
    try {
        const category = await categoryModel.findOne({ slug: categorySlug })
        const categoryID = category?._id
        const products = await ProductModel.find({ category: categoryID })
        return products;
    } catch (err: any) {
        throw new CustomError(err.message, 500);
    }
}

export const updateProduct = async (id: string, data: object) => {
    try {
        const newProduct = await ProductModel.findByIdAndUpdate(id, data)
        return newProduct;
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}

export const deleteProduct = async (id: string) => {
    try {
        await ProductModel.findByIdAndDelete(id)
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}