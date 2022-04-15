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

        it("with valid data without passing id", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: createFakeClientProps() });

            expect(clientId).toEqual(expect.any(String));
            expect(await repository.findById(clientId)).toMatchObject({ ...Client });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });

        it("with valid data passing id", async () => {
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

    describe('Should throw an Error: ', () => {

        describe('For Null Or Empty Fields: ', () => {

            const data = createFakeClientProps();

            it.each(["", null, undefined])("empty name", async (name) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...data,
                        name: name,
                    },
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("name")));
                expect(repositorySpy).not.toHaveBeenCalled();
            }
            );

            it.each(["", null, undefined])("empty email", async (email) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...data,
                        email: email,
                    },
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("email")));
                expect(repositorySpy).not.toHaveBeenCalled();
            }
            );

            it.each(["", null, undefined])("empty CPF", async (cpf) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<Client>("save");
                const sut = new CreateClientUseCase(repository);

                expect(sut.execute({
                    props: {
                        ...data,
                        cpf: cpf,
                    },
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("cpf")));
                expect(repositorySpy).not.toHaveBeenCalled();
            }
            );
        })

        it("when trying to create a client with an existing ID", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Client>("save");
            const sut = new CreateClientUseCase(repository);

            const clientId = await sut.execute({ props: createFakeClientProps() });
            try {
                await sut.execute({ props: createFakeClientProps(), id: clientId })
            }
            catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(clientId));
                expect(repository.list.length).toBe(1);
                expect(repositorySpy).toHaveBeenCalledTimes(2);
            }
        });
    })

});
