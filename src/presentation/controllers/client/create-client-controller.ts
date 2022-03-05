import { Request, Response } from "express";
import ResponseFactory from "../../../presentation/http/ResponseFactory";
import { Client } from "../../../application/domain/entities/client";
import { CreateClientUseCase } from "../../../application/useCases/client/create-client";
import IRepository from "../../../output/repositories/IRepository";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import Controller from "../Controller";

export default class CreateClientController implements Controller {

    constructor(private readonly repository: IRepository<Client>) { };

    async handle(request, response) {
        try {
            const client = await new CreateClientUseCase(this.repository).execute({ props: request.body });
            const result = new EntityModelParser().toModel(client);
            return new ResponseFactory(response).responseWithDifferentCode(201, result);
        } catch (err) {
            return new ResponseFactory(response).createResponseEntityForError(err);
        }
    }
}