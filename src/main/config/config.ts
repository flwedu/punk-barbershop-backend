import { json } from "body-parser";
import cors from "cors"
import express from "express";

const server = express();
const router = express.Router();

server.use("/api", router);
server.use(json());
server.use(cors());

export const Config = {
    server, router
}