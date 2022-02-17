import { Client, ClientProps } from "../../domain/entities/client";
import { emailRegex } from "../../util/regularExpressions";
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

        // Verifying fields
        // email
        if (!emailRegex().test(request.email)){
            return null;
        }

        const hydratedData: ClientProps = {
            ...request,
            birthDate: new Date(request.birthDate),
            createdAt: new Date()
        };
        
        return Client.create(hydratedData);
    }
}