import { parseDateValue } from "../../../util/parser";
import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";

import { Entity } from "./Entity";

export type InputBarberProps = {
    id?: string,
    name: string,
    email: string,
    birthDate: string,
    createdAt?: string,
    cpf: string,
}

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

    public static create(props: InputBarberProps, id?: string) {

        const readyProps = {
            ...props,
            email: Email.of(props.email),
            cpf: Cpf.of(props.cpf),
            birthDate: parseDateValue(props.birthDate),
            createdAt: new Date(),
        } as Props<Barber>

        const barber = new Barber(readyProps, id);
        return barber;
    }
}
