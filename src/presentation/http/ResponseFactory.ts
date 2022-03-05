import { Response } from "express";
import BusinessRuleError from "../../application/domain/errors/business-rule-error";
import ResourceNotFound from "../../application/domain/errors/resource-not-found";

export default class ResponseFactory {

    constructor(private readonly response: Response) { }

    createOkResponse(data: any) {
        return this.response.status(200).json(data)
    }

    responseWithDifferentCode(status: number, data: any) {
        return this.response.status(status).json(data);
    }

    createResponseEntityForError(error: Error) {
        if (error instanceof ResourceNotFound) {
            return this.response.status(404).json(error);
        }
        if (error instanceof BusinessRuleError) {
            return this.response.status(400).json(error);
        }
        return this.response.status(500).json(error);
    }
    createNotFoundResponse(data: string) {
        return this.response.status(404).json(data);
    }

    createServerErrorResponse(data: string) {
        return this.response.status(500).json(data);
    }

    createBadRequestErrorResponse(data: string) {
        return this.response.status(400).json(data);
    }
}
