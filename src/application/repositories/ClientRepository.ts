import { Client } from "../../domain/entities/client";

export interface ClientRepository {

    findById(id: string): Promise<Client | null>;
}