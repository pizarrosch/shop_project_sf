import express, { Express } from "express";
import {adminProductsRouter} from "./controllers/products.controllers";
import layout from "express-ejs-layouts";

export default function (): Express {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', 'Shop_admin/views')

    app.use(express.json());
    app.use(layout);
    app.use(express.static(__dirname + "/public"));
    app.use("/", adminProductsRouter);

    return app;
}