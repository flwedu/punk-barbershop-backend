export class Maybe{

    private value;

    private constructor(value: any) {
        this.value = value;
    }

    static of(value: any)  {
        return new Maybe(value);
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

    getValue() {
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