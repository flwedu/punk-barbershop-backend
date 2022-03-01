import { Entity } from "../../application/domain/entities/Entity";
import { DeleteByIdUseCase } from "../../application/useCases/deleteby-id";
import IRepository from "../../output/repositories/IRepository";
import {
    createResponseEntityForError,
    createResponseWithCode,
} from "../http/response-entity-functions";
import ResponseEntity from "../http/ResponseEntity";
import Controller from "./Controller";

export class DeleteByIdController<T extends Entity> implements Controller {
    constructor(private readonly repository: IRepository<T>) { }

    async handle(data: any): Promise<ResponseEntity<any>> {
        try {
            await new DeleteByIdUseCase<T>(this.repository).execute(data);
            return createResponseWithCode(202, "Accepted");
        } catch (err) {
            return createResponseEntityForError(err);
        }
    }
}
