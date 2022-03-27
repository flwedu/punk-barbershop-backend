import { Entity } from "../../application/domain/entities/Entity";
import IUseCase from "../../application/useCases/IUseCase";
import ResponseFactory from "../http/ResponseFactory";
import IExpressController from "./IExpressController";

export class CreateEntityController<T extends Entity> implements IExpressController {

    constructor(private readonly useCase: IUseCase) { };

    async handle(request, response) {
        try {
            const { id, ...props } = request.body;
            let data = await this.useCase.execute({ id, props });

            return new ResponseFactory(response).makeResponse(201, data);
        } catch (error) {
            return new ResponseFactory(response).makeErrorResponse(error);
        }
    }
}