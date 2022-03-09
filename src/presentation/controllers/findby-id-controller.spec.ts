import faker from "@faker-js/faker";
import { Barber } from "../../application/domain/entities/barber";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
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

        const barber = Barber.create({
            name: faker.name.findName(),
            email: faker.internet.email(),
            cpf: "12345678911",
            birthDate: faker.date.recent().toISOString()
        }, id);
        repository.list.push(barber);

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith(parser.toModel(barber));
    })

    it("should receives a 404 status code for resource not find", async () => {

        expect.assertions(2);

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
    })

})