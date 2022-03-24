import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {
    Barber,
    Client,
    Scheduling,
    ServiceType
} from "../../application/domain/entities";
import { BarberMongoDbAdapter } from "../../output/adapters/mongodb/BarberMongoDbAdapter";
import { ClientMongoDbAdapter } from "../../output/adapters/mongodb/ClientMongoDbAdapter";
import { SchedulingMongoDbAdapter } from "../../output/adapters/mongodb/SchedulingMongoDbAdapter";
import { ServiceTypeMongoDbAdapter } from "../../output/adapters/mongodb/ServiceTypeMongoDbAdapter";
import { MongoRepository } from "../../output/repositories/mongodb/MongoRepository";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import { configureMiscRoutes } from "../routes";
import {
    configureBarberExpressRoutes,
    configureClientExpressRoutes
} from "../routes/";

// Configuring server and routes
const server = express();
const router = express.Router();

server.use(express.json());
server.use("/api", router);
server.use(cors());

//Configuring MongoDB
mongoose.connect(process.env.MONGODB_URL);
const modelParser = new EntityModelParser();

let clientRepository = new MongoRepository<Client>(new ClientMongoDbAdapter(modelParser));
let barberRepository = new MongoRepository<Barber>(new BarberMongoDbAdapter(modelParser));
let serviceTypeRepository = new MongoRepository<ServiceType>(new ServiceTypeMongoDbAdapter(modelParser));
let schedulingRepository = new MongoRepository<Scheduling>(new SchedulingMongoDbAdapter(modelParser));

// Configuring routes with repositories
configureClientExpressRoutes(router, clientRepository);
configureBarberExpressRoutes(router, barberRepository);

// Exporting configurations
configureMiscRoutes(router);

export const Config = {
    server,
    router,
    repositories: {
        clientRepository,
        barberRepository,
        schedulingRepository,
        serviceTypeRepository,
    },
};
