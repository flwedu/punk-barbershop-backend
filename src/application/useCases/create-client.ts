import { Client } from "../../domain/entities/client";
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
        
        return Client.create({
            ...request,
            email: Email.of(request.email),
            cpf: Cpf.of(request.cpf),
            birthDate: new Date(request.birthDate),
            createdAt: new Date(),
        });
    }
}