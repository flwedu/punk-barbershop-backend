import { parseDateValue } from "../../../util/parser";
import BusinessRuleError from "../errors/business-rule-error";
import { TextValidator } from "../validators/TextValidator";
import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";

import { Entity, Props } from "./Entity";

export type InputBarberProps = {
    id?: string,
    name: string,
    email: string,
    birthDate: string,
    createdAt?: string,
    cpf: string,
}

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

    public static create(props: InputBarberProps, id?: string) {

        const { name, email, cpf } = props;
        const errors = new TextValidator({}).checkValues({ name, email, cpf });
        if (errors.length) throw new BusinessRuleError(`${[...errors]}`);

        const readyProps = {
            ...props,
            email: Email.of(props.email),
            cpf: Cpf.of(props.cpf),
            birthDate: parseDateValue(props.birthDate),
            createdAt: new Date(),
        }

        const barber = new Barber(readyProps, id);
        return barber;
    }
}
