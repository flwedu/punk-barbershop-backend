import { ClientRepository } from "../../../../src/application/repositories/ClientRepository";
import { Client, ClientProps } from "../../../../src/domain/entities/client";

export class IMClientRepository implements ClientRepository {
    
    public clientList: Client[] = [];
    
    async findById(id: string): Promise<Client> {
        
        const client = this.clientList.filter(client => client.id === id)[0];
        if(!client){
            Promise.reject("client not found")
        }
        return Promise.resolve(client);
    }
    
    async save(props: ClientProps, id?: string): Promise<Client> {
        const client = Client.create(props, id);
        this.clientList.push(client);

        return Promise.resolve(client);
    }
}