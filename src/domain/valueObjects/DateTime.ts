import ValueObject from './ValueObject';

export default class DateTime implements
    ValueObject<DateTime>{

    private value: Date;

    private constructor(value: string) {
        this.value = new Date(value);
        if (!/\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/g.test(this.value.toISOString())) {
            throw new Error("Invalid date")
        }
    }

    static of(value: string) {
        return new DateTime(value);
    }

    getValue() {
        return this.value;
    }

    getFormatedValue() {
        return this.value.toISOString();
    }

    equals(other: DateTime): boolean {
        return this.value === other.value;
    }

}