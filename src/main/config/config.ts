import cors from "cors";
import express from "express";
import { Barber, Client, Scheduling, ServiceType } from "../../application/domain/entities";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { configureMiscRoutes } from "../routes";
import { configureClientExpressRoutes, configureBarberExpressRoutes } from "../routes/";


// Configuring server and routes
const server = express();
const router = express.Router();

server.use(express.json());
server.use("/api", router);
server.use(cors());

// Configuring repositories
const clientRepository = new IMRepository<Client>();
const barberRepository = new IMRepository<Barber>();
const schedulingRepository = new IMRepository<Scheduling>();
const serviceTypeRepository = new IMRepository<ServiceType>();

// Exporting configurations
configureMiscRoutes(router);
configureClientExpressRoutes(router, clientRepository);
configureBarberExpressRoutes(router, barberRepository);

export const Config = {
    server, router, repositories: {
        clientRepository,
        barberRepository,
        schedulingRepository,
        serviceTypeRepository
    }
}