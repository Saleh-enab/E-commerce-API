import express from 'express';
import config from 'config';
import logger from './utils/logger';
import routes from './routes';
import mongoose from 'mongoose';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

routes(app);
app.use(errorHandler);


const port = config.get<Number>('port') || 3000
const dbURI = config.get<string>('dbURI')

app.listen(port, async () => {
    try {
        await mongoose.connect(dbURI)
        logger.info(`Connected Successfully, Listening on port ${port}`)
    } catch (err: any) {
        logger.error(err, err.message)
    }
})