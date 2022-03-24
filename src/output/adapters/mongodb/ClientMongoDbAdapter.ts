import mongoose from "mongoose";
import { Client, InputClientProps } from "../../../application/domain/entities";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { IEntityMongoDbAdapter } from "./IEntityMongoDbAdapter";

export class ClientMongoDbAdapter implements IEntityMongoDbAdapter<Client> {

    private schema = new mongoose.Schema({
        name: String,
        email: String,
        createdAt: Date,
        birthDate: Date,
        cpf: String,
    });
    private model = mongoose.model("ClientDoc", this.schema);

    constructor(private readonly modelParser: EntityModelParser) { }

    getSchema() {
        return this.schema;
    }

    getModel() {
        return this.model;
    }

    toDbModel(entity: Client, id?: string) {
        const parsedModel = this.modelParser.toModel(entity);
        return new this.model({ ...parsedModel, id: id || entity.id });
    }

    toEntity(data: any) {
        const props = data._doc as InputClientProps
        return Client.create({ ...props }, data.id);
    }

}