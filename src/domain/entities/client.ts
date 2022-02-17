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
        const client = new Client(props, id);

        return client;
    }
}
