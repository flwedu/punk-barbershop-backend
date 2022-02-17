export class Maybe<T>{

    private value: any;

    private constructor(value: any) {
        this.value = value;
    }

    static of<T>(value: any) {
        return new Maybe<T>(value);
    }

    isPresent() {
        return (this.value !== undefined && this.value !== null);
    }

    isEmpty() {
        return (this.value === undefined || this.value === null)
    }

    getValue(): T {
        if (this.isPresent()) return this.value;
        else throw new Error("Value is undefined");
    }

    getValueOrElse(otherValue: any) {
        if (this.isPresent()) return this.value;
        return otherValue;
    }
}