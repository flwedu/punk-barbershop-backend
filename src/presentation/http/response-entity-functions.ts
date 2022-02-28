import BusinessRuleError from "../../application/domain/errors/business-rule-error";
import ResourceNotFound from "../../application/domain/errors/resource-not-found";
import IResponseEntity from "./ResponseEntity";

export function createOkResponse<T>(data: T): IResponseEntity<T> {
    return {
        status: 200,
        data
    }
}

export function createResponseEntityForError(error: Error) {
    if (error instanceof ResourceNotFound) {
        return createNotFoundResponse(error.message);
    }
    if (error instanceof BusinessRuleError) {
        return createBadRequestErrorResponse(error.message);
    }
}

export function createNotFoundResponse(data: any): IResponseEntity<any> {
    return {
        status: 404,
        data
    }
}

export function createServerErrorResponse(data: any): IResponseEntity<any> {
    return {
        status: 500,
        data
    }
}

export function createBadRequestErrorResponse(data: any): IResponseEntity<any> {
    return {
        status: 400,
        data
    }
}