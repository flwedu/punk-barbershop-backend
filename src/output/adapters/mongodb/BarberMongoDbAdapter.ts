import mongoose from "mongoose";
import { Barber, InputBarberProps } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { IEntityMongoDbAdapter } from "./IEntityMongoDbAdapter";

export class BarberMongoDbAdapter implements IEntityMongoDbAdapter<Barber> {

    private schema = new mongoose.Schema({
        name: String,
        email: String,
        createdAt: Date,
        birthDate: Date,
        cpf: String,
    });
    private model = mongoose.model("BarberDoc", this.schema);

    constructor(private readonly modelParser: EntityModelParser) { }

    getSchema() {
        return this.schema;
    }

    getModel() {
        return this.model;
    }

    toDbModel(entity: Barber, id?: string) {
        const parsedModel = this.modelParser.toModel(entity);
        return new this.model({ ...parsedModel, id: id || entity.id });
    }

    toEntity(data: any) {
        const props = data._doc as InputBarberProps
        return Barber.create({ ...props }, data.id);
    }

}