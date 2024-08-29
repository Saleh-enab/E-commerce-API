import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next();
    } catch (err: any) {
        next(new CustomError(err.message, 400))
    }
}

export default validate;