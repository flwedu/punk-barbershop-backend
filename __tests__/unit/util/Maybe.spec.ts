import { Maybe } from "../../src/util/Maybe";

describe("Testing Maybe class functions", () => {

    describe("testing isPresent() function", () => {
        it("iPresent should return true", () => {

            expect.assertions(1)

            const value = "Yes";
            let maybe = Maybe.of(value);

            expect(maybe.isPresent()).toBeTruthy();

        })

        it("iPresent should return false", () => {

            expect.assertions(2)

            let maybe = Maybe.of(null);

            expect(maybe.isPresent()).toBeFalsy();

            maybe = Maybe.of(undefined);

            expect(maybe.isPresent()).toBeFalsy();
        })
    })

    describe("isEmpty() function", () => {

        it("isEmpty() should return true", () => {
            expect.assertions(2);

            let maybe = Maybe.of(null);
            expect(maybe.isEmpty()).toBeTruthy();

            maybe = Maybe.of(undefined);
            expect(maybe.isEmpty()).toBeTruthy();
        })

        it("isEmpty() should return false", () => {
            expect.assertions(2);

            let maybe = Maybe.of("A value");
            expect(maybe.isEmpty()).toBeFalsy();

            maybe = Maybe.of(111);
            expect(maybe.isEmpty()).toBeFalsy();
        })
    })

    describe("getValue() function", () => {

        it("getValue() should return the same value", () => {

            expect.assertions(1);

            let value = "Test";
            let maybe = Maybe.of(value);

            expect(maybe.getValue()).toEqual(value);
        })

        it("getValue() should return a value with promises", async () => {

            let value = "11";
            const promise = new Promise((resolve, reject) => {
                if (Number(value) > 10) resolve(value);
                reject()
            })

            let maybe = Maybe.of(await promise);

            expect(maybe.getValue()).toEqual(value);
        })
    })

    describe("getValueOrElse() function", () => {
        it("should return the previous value", () => {

            expect.assertions(1);

            let maybe = Maybe.of(1);

            expect(maybe.getValueOrElse(2)).toEqual(1);

        })

        it("should return the new value", () => {

            expect.assertions(1);

            let maybe = Maybe.of(undefined);

            expect(maybe.getValueOrElse(2)).toEqual(2);

        })
    })
})