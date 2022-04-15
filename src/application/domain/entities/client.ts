import { parseDateValue } from "../../../util/parser";
import BusinessRuleError from "../errors/business-rule-error";
import { TextValidator } from "../validators/TextValidator";
import { Cpf } from "../valueObjects/Cpf";
import { Email } from "../valueObjects/Email";
import { Entity, Props } from "./Entity";


export type InputClientProps = {
    name: string,
    email: string,
    createdAt?: string,
    birthDate: string,
    cpf: string,
}

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

    public static create(props: InputClientProps, id?: string) {

        const { name, email, cpf } = props;
        const errors = new TextValidator({}).checkValues({ name, email, cpf });
        if (errors.length) throw new BusinessRuleError(`${[...errors]}`);

        const readyProps = {
            ...props,
            email: Email.of(props.email),
            cpf: Cpf.of(props.cpf),
            birthDate: parseDateValue(props.birthDate),
            createdAt: new Date(),
        };

        const client = new Client(readyProps, id);

        return client;
    }
}