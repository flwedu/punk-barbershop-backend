import { json } from "body-parser";
import cors from "cors"
import express from "express";
import configureClientRoutes from "../routes/clientExpressRouter";

const server = express();
const router = express.Router();

configureClientRoutes(router);

server.use("/api", router);
server.use(json());
server.use(cors());

export const Config = {
    server, router
}