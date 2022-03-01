import { testEmail } from "../../../src/util/testFields"

describe("testEmail() function", () => {

    it.each(["ab@email.com", "aa@e.com", "abbc.df@email.com", "aa@email.com.br"])("should return true for a valid email address: %s", (email) => {

        expect(testEmail(email)).toBeTruthy();
    })

    it.each(["", null, undefined, "aaec", "email.com", "aa.com@br", "@.com"])("should return false for a invalid email address", (email) => {
        expect(testEmail(email)).toBeFalsy();
    })
})