import { Client } from "../../../domain/entities/client";
import { Cpf } from "../../../domain/valueObjects/Cpf";
import { Email } from "../../../domain/valueObjects/Email";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";


export type CreateClientRequest = {
    name: string;
    email: string;
    birthDate: string;
    cpf: string;
}

export class CreateClientUseCase implements IUseCase {

    constructor(private repository: IRepository<Client>) { }

    async execute(request: CreateClientRequest) {

        const clientProps = {
            ...request,
            email: Email.of(request.email),
            cpf: Cpf.of(request.cpf),
            birthDate: new Date(request.birthDate),
            createdAt: new Date(),
        };
        return await this.repository.save(clientProps);
    }
}