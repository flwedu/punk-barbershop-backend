import { createFakeClientProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { Client } from "../../domain/entities/client";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import { ErrorMessage } from "../../domain/errors/error-messages";
import { CreateClientUseCase } from "./create-client";

describe("create client use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Should create a client: ', () => {

        test("with valid data without passing id", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: createFakeClientProps() });

            expect(clientId).toEqual(expect.any(String));
            expect(await repository.findById(clientId)).toMatchObject({ ...Client });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });

        test("with valid data passing id", async () => {
            expect.assertions(4);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ id: "1", props: createFakeClientProps() });

            expect(clientId).toEqual(expect.any(String));
            expect(await repository.findById(clientId)).toMatchObject({ ...Client });
            expect(clientId).toEqual("1");
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });
    })

    describe('Should throw Error: ', () => {

        const data = createFakeClientProps();

        test.each`
        name | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("name")}
        ${undefined} | ${ErrorMessage.NULL_PARAM("name")}
        ${""} | ${ErrorMessage.NULL_PARAM("name")}
        ${"1"} | ${ErrorMessage.INVALID_TEXT_LENGTH("name", 2, 150)}

        `("$ExpectedError for name value = $name", async ({ name, ExpectedError }) => {

            expect.assertions(2);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            await expect(sut.execute({
                props: {
                    ...data,
                    name,
                },
            })).rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test.each`
        email | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("email")}
        ${undefined} | ${ErrorMessage.NULL_PARAM("email")}
        ${""} | ${ErrorMessage.NULL_PARAM("email")}
        ${"1"} | ${ErrorMessage.INVALID_TEXT_LENGTH("email", 2, 150)}
        ${"test@.com"} | ${ErrorMessage.INVALID_PARAM("e-mail")}

        `("$ExpectedError for email value = $email", async ({ email, ExpectedError }) => {

            expect.assertions(2);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            await expect(sut.execute({
                props: {
                    ...data,
                    email,
                },
            })).rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test.each`
        cpf | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("cpf")}
        ${undefined} | ${ErrorMessage.NULL_PARAM("cpf")}
        ${""} | ${ErrorMessage.NULL_PARAM("cpf")}
        ${"abcdef"} | ${ErrorMessage.INVALID_PARAM("CPF")}
        ${"123456789101"} | ${ErrorMessage.INVALID_PARAM("CPF")}

        `("$ExpectedError for cpf value = $cpf", async ({ cpf, ExpectedError }) => {

            expect.assertions(2);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            await expect(sut.execute({
                props: {
                    ...data,
                    cpf,
                },
            })).rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test("when trying to create a client with an existing ID", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: data });
            try {
                await sut.execute({ props: data, id: clientId })
            }
            catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(clientId));
                expect(repository.list.length).toBe(1);
                expect(repositorySpy).toHaveBeenCalledTimes(2);
            }
        });
    })

})
