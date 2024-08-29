import { NextFunction, Request, Response } from "express";
import { validatePassword } from "./user.controller";
import { createSession, findSession, deleteSession } from "../services/session.service";
import { signToken, verifyToken } from "../utils/jwt";
import config from "config";
import { get } from "lodash";
import { JwtPayload } from 'jsonwebtoken'

export const createSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate the user
        const user = await validatePassword(req.body.email, req.body.password)
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        //create the session
        const session = await createSession(user._id.toString())

        //create access token
        const accessToken = signToken({ ...user, session: session._id }, {
            expiresIn: config.get<string>("accessTokenTtl")
        })

        //create refresh token
        const refreshToken = signToken({ ...user, session: session._id }, {
            expiresIn: config.get<string>("refreshTokenTtl")
        })

        return res.send({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
}

export const findSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
        if (!accessToken) {
            return res.status(403).send("Token not provided")
        }
        const { decoded } = verifyToken(accessToken)
        if (!decoded) {
            return res.status(403).send("Invalid access token")
        }
        const user = decoded
        const sessions = await findSession((user as JwtPayload)._id, true)

        return res.send({ length: sessions.length, sessions });
    } catch (err) {
        next(err);
    }

}

export const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
        if (!accessToken) {
            return res.status(403).send("Token not provided")
        }
        const { decoded } = verifyToken(accessToken)
        if (!decoded) {
            return res.status(403).send("Invalid access token")
        }
        const user = decoded as JwtPayload
        await deleteSession(user.session)
        res.send("Session has been deleted")
    } catch (err) {
        next(err);
    }
}