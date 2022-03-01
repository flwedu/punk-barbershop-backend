import { Entity } from "../../application/domain/entities/Entity";
import { FindByIdUseCase } from "../../application/useCases/findby-id";
import IRepository from "../../output/repositories/IRepository";
import {
    createOkResponse,
    createBadRequestErrorResponse,
} from "../http/response-entity-functions";
import ResponseEntity from "../http/ResponseEntity";
import Controller from "./Controller";

export default class FindByIdController<T extends Entity>
    implements Controller {
    constructor(private readonly repository: IRepository<T>) { }

    async handle(data: any): Promise<ResponseEntity<T>> {
        try {
            const response = await new FindByIdUseCase(this.repository).execute(
                data
            );
            return createOkResponse(response);
        } catch (err) {
            return createBadRequestErrorResponse(err);
        }
    }
}
