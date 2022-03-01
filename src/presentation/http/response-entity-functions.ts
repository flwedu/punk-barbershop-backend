import BusinessRuleError from "../../application/domain/errors/business-rule-error";
import ResourceNotFound from "../../application/domain/errors/resource-not-found";
import IResponseEntity from "./ResponseEntity";

export function createOkResponse<T>(data: T): IResponseEntity<T> {
    return {
        status: 200,
        data
    }
}

export function createResponseWithCode<T>(status: number, data: T): IResponseEntity<T> {
    return {
        status,
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

export function createNotFoundResponse(data: string): IResponseEntity<any> {
    return {
        status: 404,
        data
    }
}

export function createServerErrorResponse(data: string): IResponseEntity<any> {
    return {
        status: 500,
        data
    }
}

export function createBadRequestErrorResponse(data: string): IResponseEntity<any> {
    return {
        status: 400,
        data
    }
}