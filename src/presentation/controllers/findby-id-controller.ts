import { Entity } from "../../application/domain/entities/Entity";
import { FindByIdUseCase } from "../../application/useCases/findby-id";
import IRepository from "../../output/repositories/IRepository";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import Controller from "./Controller";

export default class FindByIdController<T extends Entity>
    implements Controller {
    constructor(private readonly repository: IRepository<T>) { }

    async handle(request, response) {
        const { id } = request.params;
        try {
            const result = await new FindByIdUseCase(this.repository).execute(
                { id }
            );
            return new ResponseFactory(response).createOkResponse(result);
        } catch (err) {
            return new ResponseFactory(response).createResponseEntityForError(err);
        }
    }
}
