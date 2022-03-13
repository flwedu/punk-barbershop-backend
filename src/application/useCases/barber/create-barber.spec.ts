import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { Barber } from "../../domain/entities/barber";
import { CreateBarberUseCase } from "./create-barber";

describe("Create Barber Use Case tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should create a barber with valid data", async () => {

        expect.assertions(3);
        const repository = new IMRepository<Barber>();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        const barber = await sut.execute({
            props: {
                name: "Test",
                email: "barber@email.com",
                birthDate: "1980-01-05",
                cpf: "12345678911"
            }
        });

        expect(barber).toBeTruthy();
        expect(repository.findById(barber.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it.each(["", null, undefined, "a", "1"])("Should throw an error when trying to create a barber with this invalid name: %s", async (name) => {

        expect.assertions(2);
        const repository = new IMRepository();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                props: {
                    name,
                    email: "barber@Email.com",
                    birthDate: "1980-01-05",
                    cpf: "00000000000"
                }
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
    it.each(["", null, undefined, "a", "1"])("Should throw an error when trying to create a barber with this invalid email: %s", async (email) => {

        expect.assertions(2);
        const repository = new IMRepository();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                props: {
                    name: "Test",
                    email,
                    birthDate: "1980-01-05",
                    cpf: "00000000000"
                }
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it.each(["", null, "01", undefined, "654321987000"])("Should throw an error when trying to create a barber with this invalid CPF: %s", async (cpf) => {

        expect.assertions(2);
        const repository = new IMRepository();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                props: {
                    name: "Test",
                    email: "barber@email.com",
                    birthDate: "1980-01-05",
                    cpf
                }
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})