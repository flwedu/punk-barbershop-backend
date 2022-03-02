import Maybe from "./Maybe";

describe("Maybe class tests", () => {

    describe("testing isPresent() and isEmpty() function", () => {

        it.each(["", "Abc", 123, Object.create({}), {}, Boolean(false)])("Creating a maybe with value", (value) => {

            expect.assertions(2)

            const maybe = Maybe.of(value);
            expect(maybe.isPresent()).toBeTruthy();
            expect(maybe.isEmpty()).toBeFalsy()
        })

        it.each([Maybe.of(null), Maybe.of(undefined), Maybe.empty()])("Creating a maybe without value", (maybe) => {

            expect.assertions(2)

            expect(maybe.isPresent()).toBeFalsy();
            expect(maybe.isEmpty()).toBeTruthy()
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