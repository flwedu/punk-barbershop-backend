import { IMBarberRepository } from "../../repositories/test/IM-BaberRepository";
import { CreateBarber } from "./create-barber";

describe("create barber use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new barber with valid data", async () => {

        expect.assertions(3);
        const repository = new IMBarberRepository();
        const sut = new CreateBarber(repository);
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

    it("should not create a new barber with invalid email", async () => {

        expect.assertions(2);
        const repository = new IMBarberRepository();
        const sut = new CreateBarber(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email: "",
                birthDate: "1980-01-05",
                cpf: "00000000000"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it("should not create a new barber with invalid cpf", async () => {

        expect.assertions(2);
        const repository = new IMBarberRepository();
        const sut = new CreateBarber(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email: "barber@email.com",
                birthDate: "1980-01-05",
                cpf: "000000000"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})