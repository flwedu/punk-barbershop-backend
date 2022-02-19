import { Client, ClientProps } from "../../domain/entities/client";

export interface ClientRepository {

    findById(id: string): Promise<Client>;

    save(props: ClientProps, id?: string): Promise<Client>;
}