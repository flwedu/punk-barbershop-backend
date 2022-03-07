import { ErrorMessage } from "../errors/error-messages";
import IValueObject from "./ValueObject";

export class Duration implements IValueObject<Duration> {

    private minuts: number;
    private constructor(minuts: number) {
        this.minuts = minuts;
    }

    static of(durationInMinuts: string): Duration {
        const test = /^(\d+)$/.test(durationInMinuts);
        const duration = Number(durationInMinuts);
        if (!test || duration < 1) {
            throw new Error(ErrorMessage.INVALID_PARAM("duration value"))
        }
        return new Duration(duration);
    }
    getValue(): string { return this.minuts + ""; }

    equals(other: Duration): boolean {
        return this.minuts + "" === other.getValue();
    }
}