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

        test("with valid data without passing id", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            const barberId = await sut.execute({ props: createFakeBarberProps() });

            expect(barberId).toEqual(expect.any(String));
            expect(await repository.findById(barberId)).toMatchObject({ ...Barber });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        });

        test("with valid data passing id", async () => {
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

    describe('Should throw Error: ', () => {

        const data = createFakeBarberProps();

        test.each`
        name | ExpectedError
        ${null} | ${ErrorMessage.NULL_PARAM("name")}
        ${undefined} | ${ErrorMessage.NULL_PARAM("name")}
        ${""} | ${ErrorMessage.NULL_PARAM("name")}
        ${"1"} | ${ErrorMessage.INVALID_TEXT_LENGTH("name", 2, 150)}

        `("$ExpectedError for name value = $name", async ({ name, ExpectedError }) => {

            expect.assertions(2);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

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
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

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
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            await expect(sut.execute({
                props: {
                    ...data,
                    cpf,
                },
            })).rejects.toEqual(new BusinessRuleError(ExpectedError));
            expect(repositorySpy).not.toHaveBeenCalled();
        })

        test("when trying to create a barber with an existing ID", async () => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<Barber>("save");
            const sut = new CreateBarberUseCase(repository);

            const barberId = await sut.execute({ props: data });
            try {
                await sut.execute({ props: data, id: barberId })
            }
            catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(barberId));
                expect(repository.list.length).toBe(1);
                expect(repositorySpy).toHaveBeenCalledTimes(2);
            }
        });
    })

})
