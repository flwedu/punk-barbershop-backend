import { Barber, Client, Scheduling, ServiceType } from "application/domain/entities";
import { IMRepository } from "output/repositories/test/IM-Repository";
import configureClientRoutes from "../routes/clientExpressRouter";
import { json } from "body-parser";
import cors from "cors"
import express from "express";

// Configuring server and routes
const server = express();
const router = express.Router();

server.use("/api", router);
server.use(json());
server.use(cors());

// Configuring repositories
const clientRepository = new IMRepository<Client>();
const barberRepository = new IMRepository<Barber>();
const schedulingRepository = new IMRepository<Scheduling>();
const serviceTypeRepository = new IMRepository<ServiceType>();

// Exporting configurations
configureClientRoutes(router, clientRepository);

export const Config = {
    server, router, repositories: {
        clientRepository,
        barberRepository,
        schedulingRepository,
        serviceTypeRepository
    }
}