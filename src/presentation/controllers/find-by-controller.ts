import IUseCase from "../../application/useCases/IUseCase";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import EntityModelParser from "../adapters/entity-model-parser";
import Controller from "./Controller";

export default class FindByController implements Controller {
    constructor(private readonly useCase: IUseCase) { }

    async handle(request, response) {
        const query = { ...request.params, ...request.body };
        try {
            const data = await this.useCase.execute(query);
            const parsedData = new EntityModelParser().toModel(data);

            return new ResponseFactory(response).makeOkResponse(parsedData);
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }
    }
}
