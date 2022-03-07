export const ErrorMessage = {
    ID_NOT_FOUND: (id: string) => `Element with id ${id} not found`,
    ID_ALREADY_EXISTS: (id: string) => `Element with id ${id} already exists`,
    INVALID_PARAM: (param: string) => `Invalid ${param}`
}