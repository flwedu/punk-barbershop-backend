export default class ResourceNotFound extends Error {

    constructor(message: string) {
        super(message);
    }
}