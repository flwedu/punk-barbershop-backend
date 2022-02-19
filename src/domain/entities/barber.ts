import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { Entity, Props } from "./Entity";

export interface BarberProps extends Props<Barber> {
    name: string,
    email: Email,
    createdAt: Date,
    birthDate: Date,
    cpf: Cpf,
}

export class Barber extends Entity {
    private constructor(props: BarberProps, id?: string) {
        super(props, id);
    }

    public static create(props: BarberProps, id?: string) {
        const barber = new Barber(props, id);

        return barber;
    }
}
