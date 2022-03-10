import { Client } from "../../domain/entities/client";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { CreateClientUseCase } from "./create-client";
import faker from "@faker-js/faker";
import { ErrorMessage } from "../../domain/errors/error-messages";

describe("create client use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    function generateClientInputRequest(id?: string) {
        return {
            id,
            props: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                birthDate: faker.date.past(15).toISOString(),
                cpf: "00000000012",
            }
        }
    }

    function setup() {
        const repository = new IMRepository<Client>();
        const sut = new CreateClientUseCase(repository);
        const repositorySpy = jest.spyOn(repository, "save");

        return {
            repository,
            sut,
            repositorySpy,
        };
    }

    it("should create a new client with valid data", async () => {
        expect.assertions(3);
        const { repository, sut, repositorySpy } = setup();

        const client = await sut.execute(generateClientInputRequest());

        expect(client).toBeTruthy();
        expect(repository.findById(client.id)).toBeTruthy();
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });

    it.each(["", null, undefined])(
        "should not create a new client with invalid name",
        async (name) => {
            expect.assertions(2);
            const { repository, sut, repositorySpy } = setup();

            try {
                await sut.execute({
                    props: {
                        ...generateClientInputRequest().props,
                        name: name,
                    },
                });
            } catch (err) {
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it.each(["", null, undefined, "a", "1"])(
        "should not create a new client with invalid email",
        async (email) => {
            expect.assertions(2);
            const { repository, sut, repositorySpy } = setup();

            try {
                await sut.execute({
                    props: {
                        ...generateClientInputRequest().props,
                        email: email
                    },
                });
            } catch (err) {
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it.each(["", null, "01", undefined, "654321987000"])(
        "should not create a new client with invalid cpf",
        async (cpf) => {
            expect.assertions(2);
            const { repository, sut, repositorySpy } = setup();

            try {
                await sut.execute({
                    props: {
                        ...generateClientInputRequest().props,
                        cpf: cpf
                    }
                });
            } catch (err) {
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it("Should trhow error while trying to create a client with existent id", async () => {
        expect.assertions(2);
        const { sut, repositorySpy } = setup();

        await sut.execute(generateClientInputRequest("1"));
        try {
            await sut.execute(generateClientInputRequest("1"))
        }
        catch (err) {
            expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS("1"));
            expect(repositorySpy).toHaveBeenCalledTimes(2);
        }
    });
});
