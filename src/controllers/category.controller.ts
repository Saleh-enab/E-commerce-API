import { createCategory, updateCategory, deleteCategory } from "../services/category.service";
import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";
import categoryModel from "../models/category.model";

export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, slug } = req.body
        const category = await createCategory(title, slug)
        res.status(201).send(omit(category.toJSON(), "__v"))
    } catch (err) {
        next(err);
    }
}

export const findCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryModel.find({}).lean()
        res.send({ length: categories.length, categories })
    } catch (err) {
        next(err);
    }
}

export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { newTitle } = req.body
        await updateCategory(id, newTitle)
        res.status(200).send("Category has been Updated successfully")
    } catch (err) {
        next(err);
    }
}

export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await deleteCategory(id)
        res.status(200).send("Category has been Deleted Successfully")
    } catch (err) {

    }
}