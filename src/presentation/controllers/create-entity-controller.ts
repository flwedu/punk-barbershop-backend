import { Entity } from "../../application/domain/entities/Entity";
import IUseCase from "../../application/useCases/IUseCase";
import ResponseFactory from "../http/ResponseFactory";

export class CreateEntityController<T extends Entity>{

    constructor(private readonly useCase: IUseCase) { };

    async handle(request, response) {
        try {
            const { id, ...props } = request.body;
            const data = await this.useCase.execute({ id, props });
            return new ResponseFactory(response).responseWithDifferentCode(201, data);
        } catch (error) {
            return new ResponseFactory(response).createResponseEntityForError(error);
        }
    }
}