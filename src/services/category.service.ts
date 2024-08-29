import categoryModel from "../models/category.model";
import ProductModel from "../models/product.model";
import { CustomError } from "../utils/errorHandler";

export const createCategory = async (title: string, slug?: string) => {
    try {
        if (slug) {
            slug = slug.replace(/\s+/, '_').toLowerCase()
        } else {
            slug = title.replace(/\s+/, '_').toLowerCase();
        }
        const category = await categoryModel.create({ title, slug })
        return category;

    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}

export const updateCategory = async (id: string, newTitle: string) => {
    try {
        const slug = newTitle.replace(/\s+/, '_').toLowerCase()
        const newCategory = await categoryModel.findByIdAndUpdate(id, { title: newTitle, slug })
        return newCategory;
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}

export const deleteCategory = async (id: string) => {
    try {
        await ProductModel.deleteMany({ category: id })
        await categoryModel.findByIdAndDelete(id)
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}