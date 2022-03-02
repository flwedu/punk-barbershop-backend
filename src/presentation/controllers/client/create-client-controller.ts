import { Client } from "../../../application/domain/entities/client";
import { CreateClientUseCase } from "../../../application/useCases/client/create-client";
import IRepository from "../../../output/repositories/IRepository";
import EntityModelParser from "../../adapters/entity-model-parser";
import { createResponseEntityForError, createResponseWithCode } from "../../http/response-entity-functions";
import Controller from "../Controller";

export default class CreateClientController implements Controller {

    constructor(private readonly repository: IRepository<Client>) { };

    async handle(data: any) {
        try {
            const client = await new CreateClientUseCase(this.repository).execute(data);
            const response = new EntityModelParser().toModel(client);
            return createResponseWithCode(201, response);
        } catch (err) {
            return createResponseEntityForError(err);
        }
    }
}