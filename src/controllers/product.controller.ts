import { omit, get } from "lodash";
import { createProduct, deleteProduct, findProductByCategory, updateProduct } from "../services/product.service";
import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/product.model";
import { verifyToken } from "../utils/jwt";

export const createProductHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, category, description, price, image } = req.body
        const date = { title, category, description, price, image }
        const product = await createProduct(date)
        res.status(200).send(omit(product.toJSON(), "__v"))
    } catch (err) {
        next(err);
    }
}

export const findProductsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = Number(req.query.limit) || 1
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const products = await ProductModel
            .find({})
            .populate('category')
            .skip(skip)
            .limit(limit)
        res.status(200).send({ length: products.length, products })
    } catch (err) {
        next(err);
    }
}

export const findProductByCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categorySlug = req.params.category
        const products = await findProductByCategory(categorySlug)
        res.status(200).send({ length: products.length, products })
    } catch (err) {
        next(err);
    }
}

export const updateProductHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
        if (!accessToken) {
            return res.status(403).send("Token not provided")
        }
        const { decoded } = verifyToken(accessToken)
        if (!decoded) {
            return res.status(403).send("Invalid access token")
        }
        const productID = req.params.id
        const data = { ...req.body }
        await updateProduct(productID, data)
        res.status(200).send("Product Updated Successfully")
    } catch (err) {
        next(err);
    }
}

export const deleteProductHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
        if (!accessToken) {
            return res.status(403).send("Token not provided")
        }
        const { decoded } = verifyToken(accessToken)
        if (!decoded) {
            return res.status(403).send("Invalid access token")
        }
        const productID = req.params.id
        await deleteProduct(productID)
        res.status(200).send("Product has been Deleted Successfully")
    } catch (err) {
        next(err);
    }
}