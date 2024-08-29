import sessionModel from "../models/session.model";
import userModel, { UserDocument } from "../models/user.model";
import { CustomError } from "../utils/errorHandler";
import { signToken, verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import config from 'config';
import { omit } from "lodash";

export const createSession = async (userID: string) => {
    try {
        const sessoin = await sessionModel.create({ user: userID })
        return sessoin.toJSON();
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }

}

export const findSession = async (userID: string, valid: boolean) => {
    const sessions = await sessionModel.find({ user: userID, valid }).lean()
    return sessions
}

export const deleteSession = async (sessionID: string) => {
    const session = await sessionModel.findById(sessionID)
    if (session) {
        session.valid = false
        await session.save()
    }
}

export const reGenerateToken = async (refreshToken: string) => {
    const { decoded } = verifyToken(refreshToken)
    if (!decoded) {
        return false;
    }
    const sessionID = (decoded as JwtPayload).session
    const session = await sessionModel.findById(sessionID)
    if (!session || !session.valid) {
        return false;
    }

    let user: object | undefined;
    let userDoc = await userModel.findById(session.user)
    if (userDoc) {
        const userObject = userDoc.toObject() as Omit<UserDocument, "__v" | "password">;
        user = omit(userObject, ["password", "__v"])
    }
    const accessToken = signToken({ ...user, session: session._id }, {
        expiresIn: config.get<string>("accessTokenTtl")
    })
    return accessToken;
}