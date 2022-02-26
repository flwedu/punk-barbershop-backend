import { IMClientRepository } from "../../../output/repositories/test/IM-ClientRepository";
import { CreateClientUseCase } from "./create-client";

describe("create client use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new client with valid data", async () => {

        expect.assertions(3);
        const repository = new IMClientRepository();
        const sut = new CreateClientUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        const client = await sut.execute({
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        });

        expect(client).toBeTruthy();
        expect(repository.findById(client.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it("should not create a new client with invalid email", async () => {

        expect.assertions(2);
        const repository = new IMClientRepository();
        const sut = new CreateClientUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email: "",
                birthDate: "01/01/2021",
                cpf: "00000000000"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it("should not create a new client with invalid cpf", async () => {

        expect.assertions(2);
        const repository = new IMClientRepository();
        const sut = new CreateClientUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Test",
                email: "aa@email.com",
                birthDate: "01/01/2021",
                cpf: "000000000"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})