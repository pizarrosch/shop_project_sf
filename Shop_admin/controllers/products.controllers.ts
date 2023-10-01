import { Router, Request, Response } from "express";
import {getProducts} from "../models/products.model";

export const adminProductsRouter = Router();

const throwServerError =(res: Response, err: Error) => {
    console.debug(err.message);
    res.status(500);
    res.send('Something went wrong');
}

adminProductsRouter.get('/', async (req: Request, res: Response) => {
    try {
        await getProducts();
        res.send("products");
    } catch (err: any) {
        throwServerError(res, err);
    }
});
