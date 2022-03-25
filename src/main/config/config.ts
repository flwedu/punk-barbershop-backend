import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {
    Barber,
    Client,
    Scheduling,
    ServiceType,
} from "../../application/domain/entities";
import {
    BarberMongoDbAdapter,
    ClientMongoDbAdapter,
    SchedulingMongoDbAdapter,
    ServiceTypeMongoDbAdapter,
} from "../../output/adapters/mongodb/";
import IRepository from "../../output/repositories/IRepository";
import { MongoRepository } from "../../output/repositories/mongodb/MongoRepository";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import {
    configureMiscRoutes,
    configureBarberExpressRoutes,
    configureClientExpressRoutes,
} from "../routes/";

//Configuring MongoDB
mongoose.connect(process.env.MONGODB_URL);
const modelParser = new EntityModelParser();

export class ServerConfig<T, R> {
    private repositories = new Map<string, IRepository<any>>();
    private router: R;

    constructor(private readonly server: T) { }

    getServer(): T {
        return this.server;
    }

    setRepository(name: string, repository: IRepository<any>) {
        this.repositories.set(name, repository);
        return this;
    }

    setRepositories(
        repositoriesList: { name: string; repository: IRepository<any> }[]
    ) {
        repositoriesList.forEach((item) => {
            this.repositories.set(item.name, item.repository);
        });
        return this;
    }

    getRepository(name: string) {
        return this.repositories.get(name);
    }

    addRouterConfig(fn: Function) {
        // Execute the configure router function with the app router and repositories
        fn(this.router, this.repositories);
        return this;
    }

    setRouter(router: R) {
        this.router = router;
        return this;
    }

    getRouter(): R {
        return this.router;
    }
}

// Configuring server and routes
const server = express();
const router = express.Router();

server.use(express.json());
server.use("/api", router);
server.use(cors());

export const defaultAppConfig = new ServerConfig<
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
            name: "Barber",
            repository: new MongoRepository<ServiceType>(
                new ServiceTypeMongoDbAdapter(modelParser)
            ),
        },
        {
            name: "Barber",
            repository: new MongoRepository<Scheduling>(
                new SchedulingMongoDbAdapter(modelParser)
            ),
        },
    ])
    .setRouter(router)
    .addRouterConfig(configureMiscRoutes)
    .addRouterConfig(configureClientExpressRoutes)
    .addRouterConfig(configureBarberExpressRoutes);
