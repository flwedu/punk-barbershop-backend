import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { Client } from "../../../application/domain/entities/client";
import { CreateClienteRequest, CreateClientUseCase } from "../../../application/useCases/client/create-client";
import IRepository from "../../../output/repositories/IRepository";
import { createResponseEntityForError, createResponseWithCode } from "../../http/response-entity-functions";
import Controller from "../Controller";

export default class CreateClientController implements Controller {

    constructor(private readonly repository: IRepository<Client>) { };

    async handle(data: CreateClienteRequest) {
        try {
            const client = await new CreateClientUseCase(this.repository).execute(data);
            const response = new EntityModelParser().toModel(client);
            return createResponseWithCode(201, response);
        } catch (err) {
            return createResponseEntityForError(err);
        }
    }
}