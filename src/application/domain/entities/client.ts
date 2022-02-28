import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { parseDateValue } from "../valueObjects/parser";
import { Entity } from "./Entity";

export type InputClientProps = {
    id?: string,
    name: string,
    email: string,
    createdAt?: string,
    birthDate: string,
    cpf: string,
}

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

    public static create(props: InputClientProps, id?: string) {

        const readyProps = {
            ...props,
            email: Email.of(props.email),
            cpf: Cpf.of(props.cpf),
            birthDate: parseDateValue(props.birthDate),
            createdAt: new Date(),
        };

        const client = new Client(readyProps, props.id);

        return client;
    }
}