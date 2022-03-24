import mongoose from "mongoose";
import { Entity } from "../../../application/domain/entities/Entity";

export interface IEntityMongoDbAdapter<T extends Entity> {

    getSchema(): mongoose.Schema

    getModel(): mongoose.Model<T>

    toDbModel(data: T, id?: string);

    toEntity(data: any): T;
}