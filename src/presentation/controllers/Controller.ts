import { Request, Response } from "express";

export default interface Controller {

    handle(request: Request, response: Response);
}