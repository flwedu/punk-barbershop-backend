import BusinessRuleError from "../../application/domain/errors/business-rule-error";
import ResourceNotFound from "../../application/domain/errors/resource-not-found";

export default class ResponseFactory {

    constructor(private readonly response) { }

    makeOkResponse(data: any) {
        return this.response.status(200).json(data)
    }

    makeResponse(status: number, data: any) {
        return this.response.status(status).json(data);
    }

    makeErrorResponse(error: Error) {
        if (error instanceof ResourceNotFound) {
            return this.makeNotFoundResponse(error.message);
        }
        if (error instanceof BusinessRuleError) {
            return this.makeBadRequestError(error.message);
        }
        return this.response.status(500).json(error);
    }
    makeNotFoundResponse(data: string) {
        return this.response.status(404).json(data);
    }

    makeServerErrorResponse(data: string) {
        return this.response.status(500).json(data);
    }

    makeBadRequestError(data: string) {
        return this.response.status(400).json(data);
    }
}
