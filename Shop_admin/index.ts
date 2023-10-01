import express, { Express } from "express";
import {adminProductsRouter} from "./controllers/products.controllers";

export default function (): Express {
    const app = express();
    app.use(express.json());

    // app.set('views', 'Shop_admin/views')
    // app.set('view engine', 'ejs');

    app.use("/", adminProductsRouter);

    return app;
}