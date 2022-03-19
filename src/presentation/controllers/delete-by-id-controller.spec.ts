import { ServiceType } from "../../application/domain/entities/serviceType";
import { createFakeServiceType } from "../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../__test_utils__/setupFunctions";
import { DeleteByIdController } from "./";

describe("Delete by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.each(["1", "2", "50", "44546121"])("should receives 202", async (id) => {

        expect.assertions(4);

        const { repository, repositorySpy } = setupRepository<ServiceType>("delete")
        const sut = new DeleteByIdController(repository);
        const request = { params: { id } };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        const serviceType = createFakeServiceType(id);
        await repository.save(serviceType);

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(202);
        expect(response.json).toBeCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

    it.each(["8", "2", "-1", "ab", null, undefined])("should receives 404", async (id) => {

        expect.assertions(4);

        const { repository, repositorySpy } = setupRepository<ServiceType>("delete")
        const sut = new DeleteByIdController(repository);

        const request = { params: { id } };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        await repository.save(createFakeServiceType());

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })
})