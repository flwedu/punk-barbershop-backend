export class Maybe<T>{

    private value;

    private constructor(value: T | null) {
        this.value = value;
    }

    static of<T>(value: T) {
        return new Maybe<T>(value);
    }

    static empty(){
        return new Maybe(null);
    }

    isPresent() {
        return (this.value !== undefined && this.value !== null);
    }

    isEmpty() {
        return (this.value === undefined || this.value === null)
    }

    getValue(): T {
        if (this.value){
            return this.value;
        } 
        throw new Error("Value is undefined");
    }

    getValueOrElse(otherValue: any) {
        if (this.isPresent()) return this.value;
        return otherValue;
    }
}