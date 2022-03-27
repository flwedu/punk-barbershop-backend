import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { createFakeServiceTypeProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { ServiceType } from "../../domain/entities/serviceType";
import { CreateServiceTypeUseCase } from "./create-serviceType";

describe("create serviceType use case test", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should create a serviceType", async () => {

        expect.assertions(3);
        const { repository, repositorySpy } = setupRepository<ServiceType>("save");
        const sut = new CreateServiceTypeUseCase(repository);

        const resultId = await sut.execute(createFakeServiceTypeProps());

        expect(resultId).toEqual(expect.any(String));
        expect(await repository.findById(resultId)).toMatchObject({ ...ServiceType });
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

    it.each(["", "abc1", "0", null, "-1"])("Should throw an error when trying to create a serviceType with this invalid duration value: %s", async (duration) => {

        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository<ServiceType>("save");
        const sut = new CreateServiceTypeUseCase(repository);

        try {
            await sut.execute({
                ...createFakeServiceTypeProps(),
                duration,
            });

        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("duration value"))
            expect(repositorySpy).not.toHaveBeenCalled();
        }

    })

    it.each([null, "-50", "abc", "a"])("Should throw an error when trying to create a serviceType with this invalid price value: %s", async (price) => {
        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository<ServiceType>("save");
        const sut = new CreateServiceTypeUseCase(repository);

        try {
            await sut.execute({
                ...createFakeServiceTypeProps(),
                price,
            });
        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("price"))
            expect(repositorySpy).not.toHaveBeenCalled();
        }
    })
})