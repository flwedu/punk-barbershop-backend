import { Cpf } from "../../../../src/domain/valueObjects/Cpf"

it("equals() should return true", () => {

    const cpf = Cpf.of("111.222.333-44");
    const cpf2 = Cpf.of("11122233344");
    const expected = Cpf.of("11122233344");

    expect(cpf.equals(expected)).toBeTruthy();
    expect(cpf2.equals(expected)).toBeTruthy();
})

it("equals() should return false", () => {

    const cpf = Cpf.of("111.222.333-45");
    const cpf2 = Cpf.of("11122233345");
    const cpf3 = Cpf.of("111.222.333-44");

    expect(cpf.equals(cpf3)).toBeFalsy();
    expect(cpf2.equals(cpf3)).toBeFalsy();

})

it("getter of value should return the correct value", () => {
    const cpf = Cpf.of("111.222.333-45");

    expect(cpf.getValue()).toEqual("11122233345");
})

it("getFormatedValue() should return the right value", () => {

    const cpf = Cpf.of("11122233345");
    const expected = "111.222.333-45";

    expect(cpf.getFormatedValue()).toEqual(expected);

})