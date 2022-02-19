import { ValueObject } from "./ValueObject";

export class Duration implements ValueObject<Duration> {

    private minuts: number;
    private constructor(minuts: number) {
        this.minuts = minuts;
    }

    static of(durationInMinuts: string): Duration {
        const duration = Number(durationInMinuts);
        if(Number.isNaN(duration) || durationInMinuts.length < 1){
            throw new Error("failed to convert value to duration")
        }
        return new Duration(duration);
    }
    getValue(): number { return this.minuts; }

    equals(other: Duration): boolean {
        return this.minuts === other.getValue();
    }
}