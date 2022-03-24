import mongoose from "mongoose";
import { Scheduling, InputSchedulingRequestProps } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { IEntityMongoDbAdapter } from "./IEntityMongoDbAdapter";

export class SchedulingMongoDbAdapter implements IEntityMongoDbAdapter<Scheduling> {

    private schema = new mongoose.Schema({
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
        return new this.model({ ...parsedModel, id: id || entity.id });
    }

    toEntity(data: any) {
        const props = data._doc as InputSchedulingRequestProps
        return Scheduling.create({ ...props }, data.id);
    }

}