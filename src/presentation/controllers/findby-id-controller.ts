import { Entity } from "../../application/domain/entities/Entity";
import { FindByIdUseCase } from "../../application/useCases/findby-id";
import IRepository from "../../output/repositories/IRepository";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import EntityModelParser from "../adapters/entity-model-parser";
import Controller from "./Controller";

export default class FindByIdController<T extends Entity>
    implements Controller {
    constructor(private readonly repository: IRepository<T>) { }

    async handle(request, response) {
        const { id } = request.params;
        try {
            const data = await new FindByIdUseCase(this.repository).execute(
                { id }
            );
            const parsedData = new EntityModelParser().toModel(data);

            return new ResponseFactory(response).makeOkResponse(parsedData);
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }
    }
}
