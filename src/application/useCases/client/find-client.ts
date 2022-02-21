import { Client } from "../../../domain/entities/client";
import IRepository from "../../repositories/IRepository";

export type FindClientRequest = {
    id?: string,
    props?: {
        name?: string;
        email?: string;
        birthDate?: string;
        cpf?: string;
    }
}

export class FindClient {

    constructor(private readonly repository: IRepository<Client>) { }

    async execute(request: FindClientRequest) {

        if (request.id) {
            return await this.repository.findById(request.id);
        }

        return await this.repository.find(request);
    }
}