import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/user.service";
import { CustomError } from "../utils/errorHandler";
import { omit } from "lodash";
import userModel from "../models/user.model";

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.status(201).send(omit(user.toJSON(), "password", "__v"))
    } catch (err: any) {
        next(new CustomError(err.message, 409))
    }
}

export const validatePassword = async (email: string, password: string) => {
    const user = await userModel.findOne({ email })
    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password)
    if (!isValid) {
        return false;
    }
    return omit(user.toJSON(), "password", "__v")
}