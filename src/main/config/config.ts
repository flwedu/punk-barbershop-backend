import express, { Router } from "express";
import cors from "cors";

const router = Router();
import "../routes/default"
import "../routes/clientExpressRouter";

const server = express();
server.use("/api", router);
server.use(cors());

export { server, router };