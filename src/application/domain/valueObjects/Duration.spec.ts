import { Duration } from "./Duration"

describe("Duration value object class tests", () => {

    it.each(["1", "30", "50"])("Should create an value object for %s", (value) => {

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

    it.each(["1", "21", "50"])("method equals() of a Duration object %s should return true for %s", (value) => {
        expect.assertions(1);

        const duration = Duration.of(value);
        const duration2 = Duration.of(value);
        expect(duration.equals(duration2)).toBeTruthy();
    })
})