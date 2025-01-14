import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"],
    valid: Boolean,
    createdAt: Date,
    updatedAt: Date
}


const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })


const sessionModel = mongoose.model('Session', sessionSchema)

export default sessionModel;