require('dotenv').config();
import { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import Shop_api from "./Shop_api";

export let server: Express;
export let connection: Connection | null;

async function launchApplication() {
    server = initServer();
    connection = await initDataBase();

    initRouter();
}

function initRouter() {
    const shopApi = Shop_api(connection!);
    server.use("/api", shopApi);

    server.use("/", (_, res) => {
        res.send("React App");
    });
}

launchApplication();