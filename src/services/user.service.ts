import { SchemaDefinitionType } from "mongoose";
import userModel, { UserDocument } from "../models/user.model";
import { CustomError } from "../utils/errorHandler";

export const createUser = async (data: SchemaDefinitionType<UserDocument>) => {
    try {
        const user = await userModel.create(data)
        return user;
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }
}