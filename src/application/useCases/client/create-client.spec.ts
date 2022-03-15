import { createFakeClientProps } from "../../../util/MockDataFactory";
import { setupRepository } from "../../../util/TestUtilFunctions";
import { Client } from "../../domain/entities/client";
import { ErrorMessage } from "../../domain/errors/error-messages";
import { CreateClientUseCase } from "./create-client";

describe("create client use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should create a client with valid data", async () => {
        expect.assertions(3);
        const { repository, repositorySpy } = setupRepository(Client, "save");
        const sut = new CreateClientUseCase(repository);

        const client = await sut.execute({ props: createFakeClientProps() });

        expect(client).toMatchObject({ ...Client });
        expect(await repository.findById(client.id)).toMatchObject(client);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });

    it.each(["", null, undefined])(
        "Should throw an error when trying to create a client with this invalid name: %s",
        async (name) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Client, "save");
            const sut = new CreateClientUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        name: name,
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("name"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it.each(["", null, undefined, "a", "1"])(
        "Should throw an error when trying to create a client with this invalid email: %s",
        async (email) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Client, "save");
            const sut = new CreateClientUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        email: email
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("e-mail"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it.each(["", null, "01", undefined, "654321987000"])(
        "Should throw an error when trying to create a client with this invalid CPF: %s",
        async (cpf) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Client, "save");
            const sut = new CreateClientUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        cpf: cpf
                    }
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("CPF"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it("Should throw an error when trying to create a client with an existing ID", async () => {
        expect.assertions(3);
        const { repository, repositorySpy } = setupRepository(Client, "save");
        const sut = new CreateClientUseCase(repository);

        const client = await sut.execute({ props: createFakeClientProps() });
        try {
            await sut.execute({ props: createFakeClientProps(), id: client.id })
        }
        catch (err) {
            expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(client.id));
            expect(repository.list.length).toBe(1);
            expect(repositorySpy).toHaveBeenCalledTimes(2);
        }
    });
});
