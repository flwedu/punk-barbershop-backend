import { createFakeBarber, createFakeBarberProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { Barber } from "../../domain/entities";
import { ErrorMessage } from "../../domain/errors/error-messages";
import { UpdateBarberUseCase } from "./update-barber";

describe("Update barber use case tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should return a barber with all updated parameters", async () => {

        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository(Barber, "update");
        const sut = new UpdateBarberUseCase(repository);

        const barber = createFakeBarber();
        repository.list.push(barber)

        const updated = await sut.execute({
            id: barber.id,
            props: {
                ...createFakeBarberProps()
            }
        })

        expect(repositorySpy).toBeCalledTimes(1);
        expect(await repository.findById(barber.id)).toMatchObject(updated);
    })

    test.each(["1", null, undefined, ""])("Should throw an error when trying to update a inexistent barber", async (id) => {

        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository(Barber, "update");
        const sut = new UpdateBarberUseCase(repository);

        try {
            await sut.execute({ id, props: createFakeBarberProps() })
        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.ID_NOT_FOUND(id));
            expect(repositorySpy).not.toHaveBeenCalled();
        }
    })
})