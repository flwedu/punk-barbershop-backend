export const ErrorMessage = {
    ID_NOT_FOUND: (id: string, name: string = "Element") => `${name} with id ${id} not found`,
    ID_ALREADY_EXISTS: (id: string, name: string = "Element") => `${name} with id ${id} already exists`,
    INVALID_PARAM: (param: string, message?: string) => {
        return message ? `Invalid ${param}: ${message}` : `Invalid ${param}`
    },
}