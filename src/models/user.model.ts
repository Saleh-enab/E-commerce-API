import mongoose from "mongoose";
import { hash, compare } from "../utils/password";
import logger from '../utils/logger';



export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<Boolean>
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })



userSchema.pre("save", async function (next) {
    const user = this as UserDocument
    if (!user.isModified('password')) {
        return next();
    }
    const newPassword = await hash(user.password)
    user.password = newPassword
    return next();
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<Boolean> {
    const user = this as UserDocument
    const authorized = compare(candidatePassword, user.password)
        .catch((err) => {
            logger.error(err, "Error in bcrypt compare function")
            return false
        })
    return authorized;
}

const userModel = mongoose.model<UserDocument>('User', userSchema)

export default userModel;