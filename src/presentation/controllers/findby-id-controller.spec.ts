import { Barber } from "../../application/domain/entities/barber";
import { ErrorMessage } from "../../application/domain/errors/error-messages";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { createFakeBarber } from "../../__test_utils__/MockDataFactory";
import EntityModelParser from "../adapters/entity-model-parser";
import FindByIdController from "./findby-id-controller";

describe("Find by id controller", () => {

    const parser = new EntityModelParser();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    function setup() {
        const repository = new IMRepository<Barber>();
        const sut = new FindByIdController(repository);

        return { repository, sut }
    }

    it.each(["1", "2"])("Should receives a 200 status code", async (id) => {

        expect.assertions(4);
        const { repository, sut } = setup();

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
        const { sut } = setup();

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toBeCalledWith(404);
        expect(response.json).toBeCalledWith(ErrorMessage.ID_NOT_FOUND("1"))
    })

})