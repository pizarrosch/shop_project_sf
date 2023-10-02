import { Router, Request, Response } from "express";
import {getProduct, getProducts, removeProduct, searchProducts} from "../models/products.model";
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

adminProductsRouter.get('/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await getProduct(req.params.id);

        if (product) {
            res.render("product/product", {
                item: product
            });
        } else {
            res.render("product/empty-product", {
                id: req.params.id
            });
        }
    } catch (err: any) {
        throwServerError(res, err);
    }
});

adminProductsRouter.get('/remove-product/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        await removeProduct(req.params.id);
        res.redirect(`/${process.env.ADMIN_PATH}`);
    } catch (e: any) {
        throwServerError(res, e);
    }
});

adminProductsRouter.post('/save/:id', async (
    req: Request<{ id: string }, {}, { title: string }>,
    res: Response
) => {
    console.log(req.params.id);
    console.log(req.body.title);
    res.send("OK");
});
