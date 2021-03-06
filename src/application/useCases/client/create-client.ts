import IRepository from "../../../output/repositories/IRepository";
import { Client, InputClientProps } from "../../domain/entities/client";
import IUseCase from "../IUseCase";

export type CreateClienteRequest = {
    id?: string,
    props: InputClientProps
}

export class CreateClientUseCase implements IUseCase {

    constructor(private repository: IRepository<Client>) { }

    async execute(data: CreateClienteRequest) {

        const client = Client.create(data.props, data.id);
        return this.repository.save(client, client.id);
    }
}