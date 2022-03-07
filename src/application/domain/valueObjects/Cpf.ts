import { testCpf } from "../../../util/testFields";
import BusinessRuleError from "../errors/business-rule-error";
import { ErrorMessage } from "../errors/error-messages";
import IValueObject from "./ValueObject";

export class Cpf implements IValueObject<Cpf>{

    private _value: string;

    private constructor(value: string) {
        this._value = value.replace(/[\.\-]/g, '');
    }

    static of(value: string): Cpf {
        if (!testCpf(value)) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("CPF"));
        }
        return new Cpf(value);
    }

    getValue() {
        return this._value;
    }

    getFormatedValue(): string {

        const exp = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
        return this._value.replace(exp, "$1.$2.$3-$4")
    }

    equals(other: Cpf): boolean {
        return this._value === other.getValue();
    }

}