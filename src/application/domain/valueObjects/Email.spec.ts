import { Email } from "./Email";

describe("Email value object class tests", () => {

    test.each(["ab@email.com", "aa@e.com", "abbc.df@email.com", "aa@email.com.br"])("should return true for a valid email address: %s", (value) => {
        expect.assertions(1);

        const email = Email.of(value)
        expect(email.getValue()).toEqual(value);
    })

    test.each(["", null, undefined, "aaec", "email.com", "aa.com@br", "@.com"])("should return false for a invalid email address", (value) => {
        expect.assertions(1);

        try {
            const email = Email.of(value);
        }
        catch (err) {
            expect(err.message).toBeTruthy();
        }
    })

    test.each(["ab@email.com", "a@mail.com", "test@email.co.uk"])("method equals() of a Cpf object %s should return true for %s", (value) => {
        expect.assertions(1);

        const email = Email.of(value);
        const email2 = Email.of(value);
        expect(email.equals(email2)).toBeTruthy();
    })
})