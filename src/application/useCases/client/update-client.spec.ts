import { createFakeClientProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { Client } from "../../domain/entities/client";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import { ErrorMessage } from "../../domain/errors/error-messages";
import UpdateClientUseCase from "./update-client";

describe("Update client use case tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    const oldProps = createFakeClientProps();
    const newProps = createFakeClientProps();

    test("Should update a Client", async () => {

        const { repository, repositorySpy } = setupRepository<Client>("update");
        const sut = new UpdateClientUseCase(repository);

        const original = Client.create(oldProps);
        const expUpdated = Client.create(newProps, original.id);
        await repository.save(original);

        const updatedId = await sut.execute({
            id: original.id,
            props: newProps
        })

        expect.assertions(3);
        expect(await repository.findById(original.id)).toMatchObject({ ...Client });
        expect(repositorySpy).toHaveBeenCalledTimes(1);
        expect(updatedId).toEqual(original.id);
    })

    describe('Should throw Error: ', () => {

        test.each(["1", null, undefined, ""])("when trying to update a inexistent client", async (id) => {

            const { repository, repositorySpy } = setupRepository<Client>("update");
            const sut = new UpdateClientUseCase(repository);

            expect.assertions(2);
            try {
                await sut.execute({ id, props: newProps })
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_NOT_FOUND(id));
                expect(repositorySpy).not.toHaveBeenCalled();
            }
        })

        test.each`
        name | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("name")}
        ${""} | ${ErrorMessage.NULL_PARAM("name")}
        ${"a"} | ${ErrorMessage.INVALID_TEXT_LENGTH("name", 2, 150)}
        `("$ExpectedError for name value = $name ", async ({ name, ExpectedError }) => {

            const { repository, repositorySpy } = setupRepository<Client>("update");
            const sut = new UpdateClientUseCase(repository);
            const original = Client.create(oldProps);
            await repository.save(original, original.id);

            expect.assertions(2);
            await expect(sut.execute({ id: original.id, props: { ...newProps, name } }))
                .rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test.each`
        email | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("email")}
        ${""} | ${ErrorMessage.NULL_PARAM("email")}
        ${"a"} | ${ErrorMessage.INVALID_TEXT_LENGTH("email", 2, 150)}
        ${"test@.com"} | ${ErrorMessage.INVALID_PARAM("e-mail")}
        `("$ExpectedError for email value = $email ", async ({ email, ExpectedError }) => {

            const { repository, repositorySpy } = setupRepository<Client>("update");
            const sut = new UpdateClientUseCase(repository);
            const original = Client.create(oldProps);
            await repository.save(original, original.id);

            expect.assertions(2);
            await expect(sut.execute({ id: original.id, props: { ...newProps, email } }))
                .rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test.each`
        cpf | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("cpf")}
        ${""} | ${ErrorMessage.NULL_PARAM("cpf")}
        ${"a"} | ${ErrorMessage.INVALID_TEXT_LENGTH("cpf", 2, 150)}
        `("$ExpectedError for cpf value = $cpf ", async ({ cpf, ExpectedError }) => {

            const { repository, repositorySpy } = setupRepository<Client>("update");
            const sut = new UpdateClientUseCase(repository);
            const original = Client.create(oldProps);
            await repository.save(original, original.id);

            expect.assertions(2);
            await expect(sut.execute({ id: original.id, props: { ...newProps, cpf } }))
                .rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })
    })
})