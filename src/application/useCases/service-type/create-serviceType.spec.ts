import { ServiceType } from "../../domain/entities/serviceType";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { CreateServiceTypeUseCase } from "./create-serviceType";

describe("create barber use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new service type", async () => {

        expect.assertions(3);
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        const result = await sut.execute({
            name: "Corte xavoso",
            description: "Aquele corte maneiro",
            duration: "60",
            price: "50.00"
        });

        expect(result).toBeTruthy();
        expect(repository.findById(result.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it.each(["", "abc1", "0", null, "-1"])("should not create a new service type with invalid duration value", async (duration) => {

        expect.assertions(2);
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration,
                price: "50.00"
            });

        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it.each(["0", null, "-50", "abc", "a"])("should not create a new service type with invalid price value", async (price) => {
        expect.assertions(2);
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "60",
                price
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }
    })
})