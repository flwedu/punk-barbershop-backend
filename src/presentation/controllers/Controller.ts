import IResponseEntity from "../http/ResponseEntity";

export default interface Controller {

    handle(data: any): Promise<IResponseEntity>;
}