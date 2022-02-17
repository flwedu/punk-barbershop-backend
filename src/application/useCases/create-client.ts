import { Client, ClientProps } from "../../domain/entities/client";
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

        const hydratedData: ClientProps = {
            ...request,
            birthDate: new Date(request.birthDate),
            createdAt: new Date()
        };
        
        return Client.create(hydratedData);
    }
}