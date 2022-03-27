import mongoose from "mongoose";
import { InputServiceTypeProps, ServiceType } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { IEntityMongoDbAdapter } from "./IEntityMongoDbAdapter";

export class ServiceTypeMongoDbAdapter implements IEntityMongoDbAdapter<ServiceType> {

    private schema = new mongoose.Schema({
        name: String,
        description: String,
        duration: Number,
        price: Number
    });
    private model = mongoose.model("ServiceTypeDoc", this.schema);

    constructor(private readonly modelParser: EntityModelParser) { }

    getSchema() {
        return this.schema;
    }

    getModel() {
        return this.model;
    }

    toDbModel(entity: ServiceType, id?: string) {
        const parsedModel = this.modelParser.toModel(entity);
        return new this.model({ ...parsedModel, id: id || entity.id });
    }

    toEntity(data: any) {
        const props = data._doc as InputServiceTypeProps
        return ServiceType.create({ ...props }, data.id);
    }

}