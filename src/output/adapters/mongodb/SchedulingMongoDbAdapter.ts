import mongoose from "mongoose";
import { Scheduling, InputSchedulingProps } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { IEntityMongoDbAdapter } from "./IEntityMongoDbAdapter";

export class SchedulingMongoDbAdapter implements IEntityMongoDbAdapter<Scheduling> {

    private schema = new mongoose.Schema({
        _id: String,
        clientId: String,
        barberId: String,
        scheduleDate: Date,
        serviceTypeId: String,
    });
    private model = mongoose.model("SchedulingDoc", this.schema);

    constructor(private readonly modelParser: EntityModelParser) { }

    getSchema() {
        return this.schema;
    }

    getModel() {
        return this.model;
    }

    toDbModel(entity: Scheduling, id?: string) {
        const parsedModel = this.modelParser.toModel(entity);
        return new this.model({ ...parsedModel, _id: id });
    }

    toEntity(data: any) {
        const props = data._doc as InputSchedulingProps
        return Scheduling.create({ ...props }, data.id);
    }

}