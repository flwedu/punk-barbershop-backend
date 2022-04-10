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

    describe('Should create a resource: ', () => {
        it("without passing id value", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: createFakeClientProps() });

            expect(clientId).toEqual(expect.any(String));
            expect(await repository.findById(clientId)).toMatchObject({ ...Client });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });

        it("passing id value", async () => {
            expect.assertions(4);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ id: "1", props: createFakeClientProps() });

            expect(clientId).toEqual(expect.any(String));
            expect(await repository.findById(clientId)).toMatchObject({ ...Client });
            expect(clientId).toEqual("1")
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });
    })

    describe("Should throw an error: ", () => {

        it.each(["", null, undefined])(
            "When trying to create a client with this invalid name: %s",
            async (name) => {
                expect.assertions(3);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        name: name,
                    },
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.INVALID_PARAM("name")));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }

        );

        it.each(["", null, undefined, "a", "1"])(
            "When trying to create a client with this invalid email: %s",
            async (email) => {
                expect.assertions(3);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        email: email
                    },
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.INVALID_PARAM("e-mail")))

                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);
            }
        );

        it.each(["", null, "01", undefined, "654321987000"])(
            "When trying to create a client with this invalid CPF: %s",
            async (cpf) => {
                expect.assertions(3);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...createFakeClientProps(),
                        cpf: cpf
                    }
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.INVALID_PARAM("CPF")))

                expect(repository.list.length).toBe(0);
                expect(repositorySpy).toHaveBeenCalledTimes(0);

            }
        );

        it("When trying to create a client with an existing ID", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: createFakeClientProps() });
            expect(sut.execute({ props: createFakeClientProps(), id: clientId })).rejects
                .toEqual(new BusinessRuleError(ErrorMessage.ID_ALREADY_EXISTS(clientId)))

            expect(repository.list.length).toBe(1);
            expect(repositorySpy).toHaveBeenCalledTimes(2);
        }
        );
    })
});
