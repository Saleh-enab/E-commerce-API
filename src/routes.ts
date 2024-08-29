import { Express, Request, Response, NextFunction } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { createSessionHandler, deleteSessionHandler, findSessionHandler } from "./controllers/session.controller";
import { zodUserSchema } from "./schemas/user.schema";
import { zodSessionSchema } from "./schemas/session.schema";
import validate from "./middlewares/validateRecources";
import { generateNewToken } from "./middlewares/generateNewToken";
import { createCategoryHandler, deleteCategoryHandler, findCategoriesHandler, updateCategoryHandler } from "./controllers/category.controller";
import { zodCategotySchema } from "./schemas/category.schema";
import { zodProductSchema } from "./schemas/product.schema";
import { createProductHandler, deleteProductHandler, findProductByCategoryHandler, findProductsHandler, updateProductHandler } from "./controllers/product.controller";

const routes = (app: Express) => {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.status(200).send("الصحة حديد");
    })

    //user routes
    app.post('/api/users', validate(zodUserSchema), createUserHandler)

    //session routes
    app.post('/api/sessions', validate(zodSessionSchema), createSessionHandler)
    app.get('/api/sessions', generateNewToken, findSessionHandler)
    app.delete('/api/sessions', generateNewToken, deleteSessionHandler)

    //category routes
    app.post('/api/categories', validate(zodCategotySchema), createCategoryHandler)
    app.get('/api/categories', findCategoriesHandler)
    app.put('/api/categories/:id', updateCategoryHandler)
    app.delete('/api/categories/:id', deleteCategoryHandler)

    //product routes
    app.post('/api/products', validate(zodProductSchema), createProductHandler)
    app.get('/api/products/', generateNewToken, findProductsHandler)
    app.get('/api/products/:category', findProductByCategoryHandler)
    app.put('/api/products/:id', generateNewToken, updateProductHandler)
    app.delete('/api/products/:id', generateNewToken, deleteProductHandler)
}

export default routes;