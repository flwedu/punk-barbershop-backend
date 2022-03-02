import { Cpf } from "./Cpf"

describe("Cpf value object class tests", () => {

    it.each(["111.222.333-44", "11122233344"])("equals() should return true for a 11122233344", (value) => {

        expect.assertions(1);
        const cpf = Cpf.of(value);
        const expected = Cpf.of("11122233344");

        expect(cpf.equals(expected)).toBeTruthy();
    })

    it.each(["111.222.333-45", "11122233345"])("equals() should return false", (value) => {

        expect.assertions(1);
        const cpf = Cpf.of(value);
        const expected = Cpf.of("111.222.333-44");

        expect(cpf.equals(expected)).toBeFalsy();
    })

    it("getter of value should return the correct value", () => {
        const cpf = Cpf.of("111.222.333-45");

        expect(cpf.getValue()).toEqual("11122233345");
    })

    it.each([["11122233345", "111.222.333-45"], ["000.000.000-00", "000.000.000-00"]])("getFormatedValue() should return the right value", (value, expected) => {

        const cpf = Cpf.of(value);

        expect(cpf.getFormatedValue()).toEqual(expected);

    })
})