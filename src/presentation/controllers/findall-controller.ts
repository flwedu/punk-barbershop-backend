import { Entity } from "../../application/domain/entities/Entity";
import { FindAllUseCase } from "../../application/useCases/findall";
import IRepository from "../../output/repositories/IRepository";
import { createOkResponse, createResponseEntityForError, createResponseWithCode } from "../http/response-entity-functions";
import ResponseEntity from "../http/ResponseEntity";
import Controller from "./Controller";


export class FindAllController<T extends Entity> implements Controller {

    constructor(private readonly repository: IRepository<T>) { }

    async handle(): Promise<ResponseEntity<T[]>> {

        try {
            const response = await new FindAllUseCase(this.repository).execute();
            if (!response.length) {
                return createResponseWithCode(204, []);
            }
            else {
                return createOkResponse(response);
            }
        } catch (err) {
            return createResponseEntityForError(err);
        }

    }
}
