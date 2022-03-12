import { testPriceValue } from "./testFields"

describe("Testing testPriceValue function", () => {

    test.each(["12", "5.5", "2,3", "0"])("Should return true for this value: %s", (value) => {

        expect(testPriceValue(value)).toBeTruthy();
    })

    test.each(["a", null, undefined, "ABC", "-30", -2, 5, 0])("Should return false for this value: %s", (value) => {

        //@ts-ignore
        expect(testPriceValue(value)).toBeFalsy();
    })
})