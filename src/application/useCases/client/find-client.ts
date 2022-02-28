import { Client } from "../../domain/entities/client";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

export type FindClientRequest = {
    id?: string,
    props?: {
        name?: string;
        email?: string;
        birthDate?: string;
        cpf?: string;
    }
}

export class FindClientUseCase implements IUseCase {

    constructor(private readonly repository: IRepository<Client>) { }

    async execute(request: FindClientRequest) {

        if (request.id) {
            return this.repository.findById(request.id);
        }

        return this.repository.find(request);
    }
}