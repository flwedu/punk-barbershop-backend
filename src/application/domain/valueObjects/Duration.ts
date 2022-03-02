import IValueObject from "./ValueObject";

export class Duration implements IValueObject<Duration> {

    private minuts: number;
    private constructor(minuts: number) {
        this.minuts = minuts;
    }

    static of(durationInMinuts: string): Duration {
        const value = /^(\d+)$/.exec(durationInMinuts);
        const duration = Number(value[0]);
        if (!value[0] || duration < 1) {
            throw new Error("Invalid duration value")
        }
        return new Duration(duration);
    }
    getValue(): string { return this.minuts + ""; }

    equals(other: Duration): boolean {
        return this.minuts + "" === other.getValue();
    }
}