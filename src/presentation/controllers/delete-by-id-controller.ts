import { Entity } from "../../application/domain/entities/Entity";
import { DeleteByIdUseCase } from "../../application/useCases/DeleteByIdUseCase";
import IRepository from "../../output/repositories/IRepository";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import Controller from "./Controller";

export class DeleteByIdController<T extends Entity> implements Controller {
    constructor(private readonly repository: IRepository<T>) { }

    async handle(request, response) {
        const { id } = request.params;
        try {
            await new DeleteByIdUseCase<T>(this.repository).execute({ id });
            return new ResponseFactory(response).makeResponse(202, `element ${id} deleted`);
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }
    }
}
