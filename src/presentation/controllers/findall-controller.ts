import ResponseFactory from "../../presentation/http/ResponseFactory";
import { Entity } from "../../application/domain/entities/Entity";
import { FindAllUseCase } from "../../application/useCases/FindAllUseCase";
import IRepository from "../../output/repositories/IRepository";

import Controller from "./Controller";
import EntityModelParser from "../adapters/entity-model-parser";


export class FindAllController<T extends Entity> implements Controller {

    constructor(private readonly repository: IRepository<T>, private readonly modelParser?: EntityModelParser) { }

    async handle(request, response) {

        try {
            let data = await new FindAllUseCase<T>(this.repository).execute();
            if (data.length == 0) {
                return new ResponseFactory(response).makeResponse(204, [])
            }
            else {
                if (this.modelParser) {
                    data = this.modelParser.toModel(data);
                }
                return new ResponseFactory(response).makeOkResponse(data);
            }
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }

    }
}
