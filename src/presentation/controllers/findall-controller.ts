import ResponseFactory from "../../presentation/http/ResponseFactory";
import { Entity } from "../../application/domain/entities/Entity";
import { FindAllUseCase } from "../../application/useCases/FindAllUseCase";
import IRepository from "../../output/repositories/IRepository";

import Controller from "./Controller";
import EntityModelParser from "../adapters/entity-model-parser";


export class FindAllController<T extends Entity> implements Controller {

    constructor(private readonly repository: IRepository<T>) { }

    async handle(request, response) {

        try {
            const result = await new FindAllUseCase<T>(this.repository).execute();
            if (result.length == 0) {
                return new ResponseFactory(response).makeResponse(204, [])
            }
            else {
                const parser = new EntityModelParser();
                const parsedResult = result.map(parser.toModel);
                return new ResponseFactory(response).makeOkResponse(parsedResult);
            }
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }

    }
}
