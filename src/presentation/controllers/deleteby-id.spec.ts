import { ServiceType } from "../../application/domain/entities/serviceType";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { DeleteByIdController } from "./deleteby-id-controller";

describe("Delete by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.each(["1", "2", "50", "44546121"])("should return 202", async (id) => {

        expect.assertions(3);

        const repository = new IMRepository<ServiceType>();
        const sut = new DeleteByIdController(repository);
        const repositorySpy = jest.spyOn(repository, "delete");

        repository.list.push(ServiceType.create({
            name: "Corte maneiro",
            description: "Sem descrição",
            duration: "30",
            price: "50"
        }, id));

        const responseEntity = await sut.handle({ id });

        expect(responseEntity.status).toEqual(202);
        expect(repository.list.length).toBeFalsy();
        expect(repositorySpy).toBeCalledTimes(1);
    })

    it.each(["8", "2", "-1", "ab", null, undefined])("should return 404", async (id) => {

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

        const responseEntity = await sut.handle({ id });

        expect(responseEntity.status).toEqual(404);
        expect(repository.list.length).toBeTruthy();
        expect(repositorySpy).toBeCalledTimes(1);
    })
})