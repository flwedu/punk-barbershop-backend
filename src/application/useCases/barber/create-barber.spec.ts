import { createFakeBarberProps } from "../../../util/MockDataFactory";
import { setupRepository } from "../../../util/TestUtilFunctions";
import { Barber } from "../../domain/entities/barber";
import { ErrorMessage } from "../../domain/errors/error-messages";
import { CreateBarberUseCase } from "./create-barber";

describe("create barber use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should create a barber with valid data", async () => {
        expect.assertions(3);
        const { repository, repositorySpy } = setupRepository(Barber, "save");
        const sut = new CreateBarberUseCase(repository);

        const barber = await sut.execute({ props: createFakeBarberProps() });

        expect(barber).toMatchObject({ ...Barber });
        expect(await repository.findById(barber.id)).toMatchObject(barber);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });

    it.each(["", null, undefined])(
        "Should throw an error when trying to create a barber with this invalid name: %s",
        async (name) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Barber, "save");
            const sut = new CreateBarberUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeBarberProps(),
                        name: name,
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("name"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).not.toHaveBeenCalled();
            }
        }
    );

    it.each(["", null, undefined, "a", "1"])(
        "Should throw an error when trying to create a barber with this invalid email: %s",
        async (email) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Barber, "save");
            const sut = new CreateBarberUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeBarberProps(),
                        email: email
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("e-mail"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).not.toHaveBeenCalled();
            }
        }
    );

    it.each(["", null, "01", undefined, "654321987000"])(
        "Should throw an error when trying to create a barber with this invalid CPF: %s",
        async (cpf) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(Barber, "save");
            const sut = new CreateBarberUseCase(repository);

            try {
                await sut.execute({
                    props: {
                        ...createFakeBarberProps(),
                        cpf: cpf
                    }
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("CPF"));
                expect(repository.list.length).toBe(0);
                expect(repositorySpy).not.toHaveBeenCalled();
            }
        }
    );

    it("Should throw an error when trying to create a barber with an existing ID", async () => {
        expect.assertions(3);
        const { repository, repositorySpy } = setupRepository(Barber, "save");
        const sut = new CreateBarberUseCase(repository);

        const barber = await sut.execute({ props: createFakeBarberProps() });
        try {
            await sut.execute({ props: createFakeBarberProps(), id: barber.id })
        }
        catch (err) {
            expect(err.message).toEqual(ErrorMessage.ID_ALREADY_EXISTS(barber.id));
            expect(repository.list.length).toBe(1);
            expect(repositorySpy).toHaveBeenCalledTimes(2);
        }
    });
});
