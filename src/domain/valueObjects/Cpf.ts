import { testCpf } from "../../util/testFields";
import { ValueObject } from "./ValueObject";

export class Cpf implements ValueObject<Cpf>{

    private _value: string;

    private constructor(value: string) {
        this._value = value.replace(/[\.\-]/g, '');
    }

    static of(value: string): Cpf{
        if(!testCpf(value)){
            throw new Error("Invalid CPF")
        }
        return new Cpf(value);
    }

    getValue(){
        return this._value;
    }

    getFormatedValue(): string{

        const exp = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
        return this._value.replace(exp, "$1.$2.$3-$4")
    }

    equals(other: Cpf): boolean {
        return this._value === other.getValue();
    }

}