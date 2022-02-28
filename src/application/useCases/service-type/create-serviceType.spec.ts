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

    it("should not create a new service type with invalid duration value", async () => {

        expect.assertions(2);
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "",
                price: "50.00"
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "abc12",
                price: "50.00"
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "0",
                price: "50.00"
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "-1",
                price: "50.00"
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: null,
                price: "50.00"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it("should not create a new service type with invalid price value", async () => {

        expect.assertions(2);
        const repository = new IMRepository<ServiceType>();
        const sut = new CreateServiceTypeUseCase(repository);
        const spy = jest.spyOn(repository, "save");

        try {
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "60",
                price: null
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "60",
                price: "0"
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "60",
                price: ""
            });
            await sut.execute({
                name: "Corte xavoso",
                description: "Aquele corte maneiro",
                duration: "60",
                price: "abc12"
            });
        } catch (err) {
            expect(repository.list.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})