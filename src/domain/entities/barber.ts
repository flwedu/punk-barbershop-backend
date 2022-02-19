import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { Entity } from "./Entity";

export interface Props<Barber> {
    name: string,
    email: Email,
    createdAt: Date,
    birthDate: Date,
    cpf: Cpf,
}

export class Barber extends Entity {
    private constructor(props: Props<Barber>, id?: string) {
        super(props, id);
    }

    public static create(props: Props<Barber>, id?: string) {
        const barber = new Barber(props, id);

        return barber;
    }
}
