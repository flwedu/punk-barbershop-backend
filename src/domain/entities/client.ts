import { testCpf, testEmail } from "../../util/testFields";
import { Entity } from "./Entity";

export type ClientProps = {
    name: string;
    email: string;
    createdAt: Date;
    birthDate: Date;
    cpf: string;
};

export class Client extends Entity<ClientProps> {
    private constructor(props: ClientProps, id?: string) {
        super(props, id);
    }

    public static create(props: ClientProps, id?: string) {

        // Verifying fields
        if (!testEmail(props.email)){
            throw new Error("invalid email");
        }

        if(!testCpf(props.cpf)){
            throw new Error("invalid cpf");
        }

        const client = new Client(props, id);

        return client;
    }
}
