import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { Entity, Props } from "./Entity";

export interface ClientProps extends Props<Client> {
    name: string,
    email: Email,
    createdAt: Date,
    birthDate: Date,
    cpf: Cpf,
}

export class Client extends Entity {
    private constructor(props: ClientProps, id?: string) {
        super(props, id);
    }

    public static create(props: ClientProps, id?: string) {

        const client = new Client(props, id);

        return client;
    }
}
