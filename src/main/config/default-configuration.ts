import "dotenv/config";
import express from "express";
import cors from "cors";
import { Client, Barber, ServiceType, Scheduling } from "../../application/domain/entities";
import { ClientMongoDbAdapter, BarberMongoDbAdapter, ServiceTypeMongoDbAdapter, SchedulingMongoDbAdapter } from "../../output/adapters/mongodb";
import { MongoRepository } from "../../output/repositories/mongodb/MongoRepository";
import { configureMiscRoutes, configureClientExpressRoutes, configureBarberExpressRoutes, configureSchedulingExpressRoutes, configureServiceTypeExpressRoutes } from "../routes";
import { ServerConfig } from "./ServerConfig";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import mongoose from "mongoose";

//Configuring MongoDB
mongoose.connect(process.env.MONGODB_URL);
const modelParser = new EntityModelParser();

// Configuring server and routes
const server = express();
const router = express.Router();

server.use(express.json());
server.use("/api", router);
server.use(cors());

export const defaultAppConfiguration = new ServerConfig<
    express.Express,
    express.Router
>(server)
    .setRepositories([
        {
            name: "Client",
            repository: new MongoRepository<Client>(
                new ClientMongoDbAdapter(modelParser)
            ),
        },
        {
            name: "Barber",
            repository: new MongoRepository<Barber>(
                new BarberMongoDbAdapter(modelParser)
            ),
        },
        {
            name: "ServiceType",
            repository: new MongoRepository<ServiceType>(
                new ServiceTypeMongoDbAdapter(modelParser)
            ),
        },
        {
            name: "Scheduling",
            repository: new MongoRepository<Scheduling>(
                new SchedulingMongoDbAdapter(modelParser)
            ),
        },
    ])
    .setRouter(router)
    .addRouterConfig(configureMiscRoutes)
    .addRouterConfig(configureClientExpressRoutes)
    .addRouterConfig(configureBarberExpressRoutes)
    .addRouterConfig(configureSchedulingExpressRoutes)
    .addRouterConfig(configureServiceTypeExpressRoutes);