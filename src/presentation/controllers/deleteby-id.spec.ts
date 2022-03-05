import { ServiceType } from "../../application/domain/entities/serviceType";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { DeleteByIdController } from "./deleteby-id-controller";

describe("Delete by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.each(["1", "2", "50", "44546121"])("should receives 202", async (id) => {

        expect.assertions(4);

        const repository = new IMRepository<ServiceType>();
        const sut = new DeleteByIdController(repository);
        const repositorySpy = jest.spyOn(repository, "delete");
        const request = { params: { id } };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        repository.list.push(ServiceType.create({
            name: "Corte maneiro",
            description: "Sem descrição",
            duration: "30",
            price: "50"
        }, id));

        await sut.handle(request, response);

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(202);
        expect(response.json).toBeCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

    it.each(["8", "2", "-1", "ab", null, undefined])("should receives 404", async (id) => {

        expect.assertions(4);

        const repository = new IMRepository<ServiceType>();
        const sut = new DeleteByIdController(repository);
        const repositorySpy = jest.spyOn(repository, "delete");
        const request = { params: { id } };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        repository.list.push(ServiceType.create({
            name: "Corte maneiro",
            description: "Sem descrição",
            duration: "30",
            price: "50"
        }, "1"));

        await sut.handle(request, response);

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(404);
        expect(response.json).toBeCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })
})