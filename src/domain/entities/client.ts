import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { Entity } from "./Entity";

export interface Props<Client> {
    name: string,
    email: Email,
    createdAt: Date,
    birthDate: Date,
    cpf: Cpf,
}

export class Client extends Entity {
    private constructor(props: Props<Client>, id?: string) {
        super(props, id);
    }

    public static create(props: Props<Client>, id?: string) {

        const client = new Client(props, id);

        return client;
    }
}