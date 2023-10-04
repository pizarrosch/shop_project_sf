import {Router, Request, Response} from "express";
import {throwServerError} from "./helpers";

export const authRouter = Router();

authRouter.get("/login", async (req: Request, res: Response) => {
    try {
        res.render("login");
    } catch (e: any) {
        throwServerError(res, e);
    }
});