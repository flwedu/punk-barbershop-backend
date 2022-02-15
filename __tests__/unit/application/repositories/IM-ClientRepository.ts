import { ClientRepository } from "../../../../src/application/repositories/ClientRepository";
import { Client } from "../../../../src/domain/entities/client";

export class IMClientRepository implements ClientRepository {

    public clientList: Client[] = [];

    async findById(id: string): Promise<Client> {

        const client = this.clientList.filter(client => client.id === id)[0];
        return client
    }

}