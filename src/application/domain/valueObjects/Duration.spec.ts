import { Duration } from "./Duration"

describe("Testing Duration value object", () => {

    it.each(["1", "30", "50"])("Should create an ValueObject for %s", (value) => {

        expect.assertions(2);
        const duration = Duration.of(value);

        expect(duration).toBeTruthy();
        expect(duration.getValue()).toEqual(value)
    })

    it.each(["", null, undefined, "a", "-5", "0", "1.5", "2,6"])("Should throw error for %s", (value) => {

        expect.assertions(1);
        try {
            const duration = Duration.of(value);
        } catch (err) {
            expect(true).toBeTruthy();
        }
    })
})