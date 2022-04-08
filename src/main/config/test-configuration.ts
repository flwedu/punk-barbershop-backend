import express from "express";
import cors from "cors";
import { Barber, Client, Scheduling, ServiceType } from "../../application/domain/entities";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { configureBarberExpressRoutes, configureClientExpressRoutes, configureSchedulingExpressRoutes, configureServiceTypeExpressRoutes } from "../routes";
import { ServerConfig } from "./ServerConfig";

// Configuring server and routes
const server = express();
const router = express.Router();

server.use(express.json());
server.use("/api", router);
server.use(cors());

export const testInMemoryAppConfiguration = new ServerConfig<
    express.Express,
    express.Router
>(server)
    .setRepositories([
        {
            name: "Client",
            repository: new IMRepository<Client>(),
        },
        {
            name: "Barber",
            repository: new IMRepository<Barber>(),
        },
        {
            name: "Scheduling",
            repository: new IMRepository<Scheduling>(),
        },
        {
            name: "ServiceType",
            repository: new IMRepository<ServiceType>(),
        },
    ])
    .setRouter(router)
    .addRouterConfig(configureClientExpressRoutes)
    .addRouterConfig(configureBarberExpressRoutes)
    .addRouterConfig(configureSchedulingExpressRoutes)
    .addRouterConfig(configureServiceTypeExpressRoutes);