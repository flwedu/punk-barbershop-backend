import { testEmail } from "../../../src/util/testFields"

describe("testEmail() function", () => {

    it("should return true for a valid email address", () => {

        expect(testEmail("ab@email.com")).toBeTruthy();
        expect(testEmail("aa@e.com")).toBeTruthy();
        expect(testEmail("abbc.df@email.com")).toBeTruthy();
        expect(testEmail("aa@email.com.br")).toBeTruthy();
    })

    it("should return false for a invalid email address", () => {

        expect(testEmail("abemail.com")).toBeFalsy();
        expect(testEmail("aaecom")).toBeFalsy();
        expect(testEmail("")).toBeFalsy();
        expect(testEmail("aa.com@br")).toBeFalsy();
    })
})