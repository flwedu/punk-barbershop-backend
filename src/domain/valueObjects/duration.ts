export class Duration {

    private minuts: number;
    private constructor(minuts: number) {
        this.minuts = minuts;
    }

    static set(minuts: number): Duration {
        const duration = new Duration(minuts);
        return duration;
    }

    getMinuts(): number { return this.minuts; }
}