import faker from "@faker-js/faker";
import { Barber } from "../../application/domain/entities/barber";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import FindByIdController from "./findby-id-controller";

describe("Find by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.each(["1", "2"])("Should receives a 200 status code", async (id) => {

        expect.assertions(4);
        const repository = new IMRepository<Barber>();
        const sut = new FindByIdController(repository);
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
        expect(response.json).toBeCalledWith(barber);
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
        const repository = new IMRepository<Barber>();
        const sut = new FindByIdController(repository);

        await sut.handle(request, response);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toBeCalledWith(404);
    })

})