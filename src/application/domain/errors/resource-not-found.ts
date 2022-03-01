export default class ResourceNotFound extends Error {

    constructor(message: string = "Resource not found") {
        super(message);
    }
}