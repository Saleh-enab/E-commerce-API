import { Request, Response, NextFunction } from "express";
import { reGenerateToken } from "../services/session.service";
import { verifyToken } from "../utils/jwt";
import { get } from "lodash";

export const generateNewToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const { valid } = verifyToken(accessToken)
        const refreshToken = get(req, "headers.x-refresh")
        if (!valid && refreshToken) {
            const newAccessToken = await reGenerateToken(refreshToken as string);

            if (newAccessToken) {
                req.headers.authorization = `Bearer ${newAccessToken}`
                res.setHeader("x-access-token", newAccessToken);
            } else {
                return res.status(401).send("Refresh token or session is expired");
            }
        }
        return next();
    } catch (err) {
        next(err);
    }
}
