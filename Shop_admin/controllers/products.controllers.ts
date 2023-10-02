import { Router, Request, Response } from "express";
import {getProducts, searchProducts} from "../models/products.model";
import {IProductSearchPayload} from "@Shared/types";

export const adminProductsRouter = Router();

const throwServerError =(res: Response, err: Error) => {
    console.debug(err.message);
    res.status(500);
    res.send('Something went wrong');
}

adminProductsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.render("./products", {
            items: products,
            queryParams: {}
        });
    } catch (err: any) {
        throwServerError(res, err);
    }
});

adminProductsRouter.get('/search', async (
    req: Request<{}, {}, {}, IProductSearchPayload>,
    res: Response
) => {
    try {
        const products = await searchProducts(req.query);
        res.render("products", {
            items: products,
            queryParams: req.query
        });
    } catch (err: any) {
        throwServerError(res, err);
    }
});
