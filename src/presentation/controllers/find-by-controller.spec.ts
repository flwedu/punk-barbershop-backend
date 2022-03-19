import { Barber } from "../../application/domain/entities";
import { ErrorMessage } from "../../application/domain/errors/error-messages";
import { createFakeBarber } from "../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../__test_utils__/setupFunctions";
import EntityModelParser from "../adapters/entity-model-parser";
import { FindByController } from "./";
import { FindByIdUseCase } from "../../application/useCases/findby-id"

describe("Find by id controller", () => {

    const parser = new EntityModelParser();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.each(["1", "2"])("Should receives a 200 status code", async (id) => {

        expect.assertions(4);
        const { repository } = setupRepository<Barber>("findById");
        const sut = new FindByController(new FindByIdUseCase(repository));

        const request = {
            params: {
                id
            }
        };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        const barber = createFakeBarber(id);
        await repository.save(barber);

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith(parser.toModel(barber));
    })

    it("should receives a 404 status code for resource not find", async () => {

        expect.assertions(3);

        const request = {
            params: {
                id: "1"
            }
        }
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };
        const { repository } = setupRepository<Barber>("findById");
        const sut = new FindByController(new FindByIdUseCase(repository));

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toBeCalledWith(404);
        expect(response.json).toBeCalledWith(ErrorMessage.ID_NOT_FOUND("1"))
    })

})