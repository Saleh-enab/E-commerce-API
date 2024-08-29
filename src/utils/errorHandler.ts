import logger from './logger';
import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
    status: number
    message: string

    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    logger.error(err.message)
    res.sendStatus(err.status)
}

export { CustomError, errorHandler }