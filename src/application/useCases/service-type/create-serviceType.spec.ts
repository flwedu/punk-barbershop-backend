import faker from "@faker-js/faker";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { ServiceType } from "../../domain/entities/serviceType";
import { CreateServiceTypeUseCase } from "./create-serviceType";

describe("create serviceType use case test", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    function setup() {
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        return { repository, sut, spy }
    }

    function generateServiceTypeProps() {
        return {
            name: faker.lorem.words(15),
            description: faker.lorem.words(25),
            duration: Math.floor(Math.random() * 121).toString(),
            price: (Math.random() * 10).toFixed(2)
        }
    }

    it("Should create a serviceType", async () => {

        expect.assertions(3);
        const { repository, sut, spy } = setup();

        const result = await sut.execute(generateServiceTypeProps());

        expect(result).toMatchObject({ ...ServiceType });
        expect(await repository.findById(result.id)).toMatchObject({ ...ServiceType });
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it.each(["", "abc1", "0", null, "-1"])("Should throw an error when trying to create a serviceType with this invalid duration value: %s", async (duration) => {

        expect.assertions(3);
        const { repository, sut, spy } = setup();

        try {
            await sut.execute({
                ...generateServiceTypeProps(),
                duration,
            });

        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("duration value"))
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it.each([null, "-50", "abc", "a"])("Should throw an error when trying to create a serviceType with this invalid price value: %s", async (price) => {
        expect.assertions(3);
        const { repository, sut, spy } = setup();

        try {
            await sut.execute({
                ...generateServiceTypeProps(),
                price,
            });
        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("price"))
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }
    })
})