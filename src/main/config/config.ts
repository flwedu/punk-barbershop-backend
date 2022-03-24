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
import { BarberMongoRepository } from "../../output/repositories/mongodb/BarberMongoRepository";
import { ClientMongoRepository } from "../../output/repositories/mongodb/ClientMongoRepository";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
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

// Configuring repositories
let clientRepository;
let barberRepository;
let schedulingRepository = new IMRepository<Scheduling>();
let serviceTypeRepository = new IMRepository<ServiceType>();

//Configuring MongoDB
mongoose.connect(process.env.MONGODB_URL);

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: String,
    birthDate: String,
    cpf: String,
});

clientRepository = new ClientMongoRepository({
    entityClass: Client,
    model: mongoose.model("ClientDoc", personSchema),
    schema: personSchema,
    modelParser: new EntityModelParser(),
});

barberRepository = new BarberMongoRepository({
    entityClass: Barber,
    model: mongoose.model("BarberDoc", personSchema),
    schema: personSchema,
    modelParser: new EntityModelParser(),
});

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
