import { Cpf } from "../../domain/valueObjects/Cpf";
import { Email } from "../../domain/valueObjects/Email";
import { ClientRepository } from "../repositories/ClientRepository";

type CreateClientRequest = {
    name: string;
    email: string;
    birthDate: string;
    cpf: string;
}

export class CreateClient {

    constructor(private clientRepository: ClientRepository){}

    async execute(request: CreateClientRequest){

        const clientProps = {
            ...request,
            email: Email.of(request.email),
            cpf: Cpf.of(request.cpf),
            birthDate: new Date(request.birthDate),
            createdAt: new Date(),
        };
        return await this.clientRepository.save(clientProps);
    }
}