import { ServiceType } from "../../application/domain/entities/serviceType";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { DeleteByIdController } from "./deleteby-id-controller";

describe("Delete by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should return 202", async () => {

        expect.assertions(3);

        const repository = new IMRepository<ServiceType>();
        const sut = new DeleteByIdController(repository);
        const repositorySpy = jest.spyOn(repository, "delete");

        repository.list.push(ServiceType.create({
            name: "Corte maneiro",
            description: "Sem descrição",
            duration: "30",
            price: "50"
        }, "1"));

        const responseEntity = await sut.handle({ id: "1" });

        expect(responseEntity.status).toEqual(202);
        expect(repository.list.length).toBeFalsy();
        expect(repositorySpy).toBeCalledTimes(1);
    })

    it("should return 404", async () => {

        // expect.assertions(3);

        const repository = new IMRepository<ServiceType>();
        const sut = new DeleteByIdController(repository);
        const repositorySpy = jest.spyOn(repository, "delete");

        repository.list.push(ServiceType.create({
            name: "Corte maneiro",
            description: "Sem descrição",
            duration: "30",
            price: "50"
        }, "1"));

        const responseEntity = await sut.handle({ id: "2" });

        expect(responseEntity.status).toEqual(404);
        expect(repository.list.length).toBeTruthy();
        expect(repositorySpy).toBeCalledTimes(1);
    })
})