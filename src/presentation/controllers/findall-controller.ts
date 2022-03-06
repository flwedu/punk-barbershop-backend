import ResponseFactory from "../../presentation/http/ResponseFactory";
import { Entity } from "../../application/domain/entities/Entity";
import { FindAllUseCase } from "../../application/useCases/findall";
import IRepository from "../../output/repositories/IRepository";

import Controller from "./Controller";


export class FindAllController<T extends Entity> implements Controller {

    constructor(private readonly repository: IRepository<T>) { }

    async handle(request, response) {

        try {
            const result = await new FindAllUseCase<T>(this.repository).execute();
            if (result.length == 0) {
                return new ResponseFactory(response).responseWithDifferentCode(204, [])
            }
            else {
                return new ResponseFactory(response).createOkResponse(result);
            }
        } catch (err) {
            return new ResponseFactory(response).createResponseEntityForError(err);
        }

    }
}
