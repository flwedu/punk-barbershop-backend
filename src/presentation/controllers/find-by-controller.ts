import IUseCase from "../../application/useCases/IUseCase";
import ResponseFactory from "../../presentation/http/ResponseFactory";
import EntityModelParser from "../adapters/entity-model-parser";
import IExpressController from "./IExpressController";

export default class FindByController implements IExpressController {
    constructor(private readonly useCase: IUseCase, private readonly modelParser?: EntityModelParser) { }

    async handle(request, response) {
        const query = { ...request.params, ...request.body };
        try {
            let data = await this.useCase.execute(query);
            if (this.modelParser) {
                data = this.modelParser.toModel(data);
            }
            return new ResponseFactory(response).makeOkResponse(data);
        } catch (err) {
            return new ResponseFactory(response).makeErrorResponse(err);
        }
    }
}
