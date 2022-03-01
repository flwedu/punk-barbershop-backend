import { Barber } from "../../domain/entities/barber";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { CreateBarberUseCase } from "./create-barber";

describe("create barber use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new barber with valid data", async () => {

        expect.assertions(3);
        const repository = new IMRepository<Barber>();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        const barber = await sut.execute({
            name: "Test",
            email: "barber@email.com",
            birthDate: "1980-01-05",
            cpf: "00000000000"
        });

        expect(barber).toBeTruthy();
        expect(repository.findById(barber.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it.each(["", null, undefined, "a", "1"])("should not create a new barber with invalid email", async (email) => {

        expect.assertions(2);
        const repository = new IMRepository();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email,
                birthDate: "1980-01-05",
                cpf: "00000000000"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it.each(["", null, "01", undefined, "654321987000"])("should not create a new barber with invalid cpf -> %d", async (cpf) => {

        expect.assertions(2);
        const repository = new IMRepository();
        const sut = new CreateBarberUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email: "barber@email.com",
                birthDate: "1980-01-05",
                cpf
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})