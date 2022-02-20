import Maybe from "../../../src/util/Maybe";

describe("Testing Maybe class functions", () => {

    describe("testing isPresent() function", () => {
        it("iPresent should return true", () => {

            expect.assertions(3)

            const maybeString = Maybe.of("ABC");
            const maybeNumber = Maybe.of(123);
            const maybeObject = Maybe.of(Object.create({}));

            expect(maybeString.isPresent()).toBeTruthy();
            expect(maybeNumber.isPresent()).toBeTruthy();
            expect(maybeObject.isPresent()).toBeTruthy();
        })

        it("iPresent should return false", () => {

            expect.assertions(3)

            const maybeNull = Maybe.of(null);
            const maybeUndefined = Maybe.of(undefined);
            const maybeEmpty = Maybe.empty();

            expect(maybeNull.isPresent()).toBeFalsy();
            expect(maybeUndefined.isPresent()).toBeFalsy();
            expect(maybeEmpty.isPresent()).toBeFalsy();
        })
    })

    describe("isEmpty() function", () => {

        it("isEmpty() should return true", () => {
            expect.assertions(3)

            const maybeNull = Maybe.of(null);
            const maybeUndefined = Maybe.of(undefined);
            const maybeEmpty = Maybe.empty();

            expect(maybeNull.isEmpty()).toBeTruthy();
            expect(maybeUndefined.isEmpty()).toBeTruthy();
            expect(maybeEmpty.isEmpty()).toBeTruthy();
        })

        it("isEmpty() should return false", () => {
            expect.assertions(3)

            const maybeString = Maybe.of("ABC");
            const maybeNumber = Maybe.of(123);
            const maybeObject = Maybe.of(Object.create({}));

            expect(maybeString.isEmpty()).toBeFalsy();
            expect(maybeNumber.isEmpty()).toBeFalsy();
            expect(maybeObject.isEmpty()).toBeFalsy();
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