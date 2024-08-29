import config from 'config';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandler';


export const signToken = (object: Object, options?: jwt.SignOptions | undefined) => {
    try {
        const privateKey = config.get<string>("accessTokenPrivateKey")
        return jwt.sign(object, privateKey, {
            ...(options && options),
            algorithm: "RS256"
        })
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }

}

export const verifyToken = (token: string) => {
    try {
        const publicKey = config.get<string>("accessTokenPublicKey")
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            decoded
        }
    } catch (err: any) {
        return {
            valid: false,
            decoded: null
        }
    }

}