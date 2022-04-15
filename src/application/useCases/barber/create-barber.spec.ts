import { createFakeBarberProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { Barber } from "../../domain/entities/barber";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import { ErrorMessage } from "../../domain/errors/error-messages";
import { CreateBarberUseCase } from "./create-barber";

describe("create barber use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Should create a barber: ', () => {

        it("with valid data without passing id", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            const barberId = await sut.execute({ props: createFakeBarberProps() });

            expect(barberId).toEqual(expect.any(String));
            expect(await repository.findById(barberId)).toMatchObject({ ...Barber });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });

        it("with valid data passing id", async () => {
            expect.assertions(4);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            const barberId = await sut.execute({ id: "1", props: createFakeBarberProps() });

            expect(barberId).toEqual(expect.any(String));
            expect(await repository.findById(barberId)).toMatchObject({ ...Barber });
            expect(barberId).toEqual("1");
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });
    })

    describe('Should throw an Error: ', () => {

        describe('For Null Or Empty Fields: ', () => {

            const data = createFakeBarberProps();

            it.each(["", null, undefined])("empty name", async (name) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<Barber>("save");
                const sut = new CreateBarberUseCase(repository);

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
                const { repository, repositorySpy } = setupRepository<Barber>("save");
                const sut = new CreateBarberUseCase(repository);

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
                const { repository, repositorySpy } = setupRepository<Barber>("save");
                const sut = new CreateBarberUseCase(repository);

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

        it("when trying to create a barber with an existing ID", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            const barberId = await sut.execute({ props: createFakeBarberProps() });
            try {
                await sut.execute({ props: createFakeBarberProps(), id: barberId })
            }
            catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(barberId));
                expect(repository.list.length).toBe(1);
                expect(repositorySpy).toHaveBeenCalledTimes(2);
            }
        });
    })

});
