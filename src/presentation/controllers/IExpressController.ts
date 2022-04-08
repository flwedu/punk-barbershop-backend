import { Request, Response } from "express";

export default interface IExpressController {

    handle(request: Request, response: Response);
}