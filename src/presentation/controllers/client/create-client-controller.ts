import { CreateClientUseCase } from "../../../application/useCases/client/create-client";
import { Client, InputClientProps } from "../../../application/domain/entities/client";
import IRepository from "../../../output/repositories/IRepository";
import { ClientPresentationModelAdapter } from "../../adapters/client-presentation-model-adapter";
import { createResponseEntityForError } from "../../http/response-entity-functions";
import Controller from "../Controller";

export default class CreateClientController implements Controller {

    constructor(private readonly repository: IRepository<Client>) { };

    async handle(data: InputClientProps) {
        try {
            const client = await new CreateClientUseCase(this.repository).execute(data);
            const response = new ClientPresentationModelAdapter().toModel(client);
            return {
                status: 201,
                data: response
            }
        } catch (err) {
            return createResponseEntityForError(err);
        }
    }
}