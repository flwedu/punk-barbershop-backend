import { Entity } from "../../application/domain/entities/Entity";
import IUseCase from "../../application/useCases/IUseCase";
import EntityModelParser from "../adapters/entity-model-parser";
import ResponseFactory from "../http/ResponseFactory";

export default class UpdateEntityController<T extends Entity> {
    constructor(private readonly useCase: IUseCase) { }

    async handle(request, response) {
        try {
            const id = request.params.id;
            const props = request.body;
            const data = await this.useCase.execute({ id, props });
            const parsedData = new EntityModelParser().toModel(data);

            return new ResponseFactory(response).makeResponse(202, parsedData);
        } catch (error) {
            return new ResponseFactory(response).makeErrorResponse(error);
        }
    }
}
