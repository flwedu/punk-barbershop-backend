import { Entity } from "../../application/domain/entities/Entity";
import { FindAllUseCase } from "../../application/useCases/FindAllUseCase";
import IRepository from "../../output/repositories/IRepository";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import EntityModelParser from "../adapters/entity-model-parser";
import IExpressController from "./IExpressController";



export class FindAllController<T extends Entity> implements IExpressController {

    constructor(private readonly repository: IRepository<T>, private readonly modelParser?: EntityModelParser) { }

    async handle(request, response) {

        try {
            let data = await new FindAllUseCase<T>(this.repository).execute();
            if (data.length == 0) {
                return new ResponseFactory(response).makeResponse(204, [])
            }
            else {
                if (this.modelParser) {
                    data = data.map(this.modelParser.toModel);
                }
                return new ResponseFactory(response).makeOkResponse(data);
            }
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }

    }
}
