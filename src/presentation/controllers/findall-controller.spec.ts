import { Client } from "../../application/domain/entities/client";
import { createFakeClient } from "../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../__test_utils__/setupFunctions";
import EntityModelParser from "../adapters/entity-model-parser";
import { FindAllController } from "./findall-controller";

describe("find all controller", () => {
    const parser = new EntityModelParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 204 and a empty data body", async () => {
        expect.assertions(5);

        const { repository, repositorySpy } = setupRepository(
            Client,
            "findAll"
        );
        const sut = new FindAllController(repository);

        const request = {};
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response),
        };

        await sut.handle(request, response);

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(204);
        expect(response.json).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith([]);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });

    it("should receives 200 status code and a filled data body", async () => {
        expect.assertions(5);

        const { repository, repositorySpy } = setupRepository(
            Client,
            "findAll"
        );
        const sut = new FindAllController(repository);

        const request = {};
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response),
        };
        await repository.save(createFakeClient());

        await sut.handle(request, response);

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith(
            repository.list.map(parser.toModel)
        );
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });
});
