import mongoose from "mongoose";
import { Client } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { MongoRepository } from "./MongoRepository";

export class ClientMongoRepository extends MongoRepository<Client>{

    constructor(args: {
        entityClass: any,
        modelParser: EntityModelParser,
        model: mongoose.Model<any>,
        schema: mongoose.Schema
    }) {
        super(args);
    }
}