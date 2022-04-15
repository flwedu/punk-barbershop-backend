export const ErrorMessage = {
    ID_NOT_FOUND: (id: string, name: string = "Element") => `${name} with id ${id} not found`,
    ID_ALREADY_EXISTS: (id: string, name: string = "Element") => `${name} with id ${id} already exists`,
    INVALID_PARAM: (param: string, message?: string) => {
        return message ? `Invalid ${param}: ${message}` : `Invalid ${param}`
    },
    NULL_PARAM: (param: string) => `${param} can't be null or empty.`,
    INVALID_TEXT_LENGTH: (param: string, minLength: number, maxLength: number) => `${param} must have between ${minLength} - ${maxLength} characters`
}