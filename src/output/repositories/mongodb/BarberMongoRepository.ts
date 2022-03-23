import mongoose from "mongoose";
import { Barber } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { MongoRepository } from "./MongoRepository";

export class BarberMongoRepository extends MongoRepository<Barber>{

    constructor(args: {
        entityClass: any,
        modelParser: EntityModelParser,
        model: mongoose.Model<any>,
        schema: mongoose.Schema
    }) {
        super(args);
    }
}