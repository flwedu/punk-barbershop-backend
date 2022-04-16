import faker from "@faker-js/faker";
import { setupRepository } from "../../__test_utils__/setupFunctions"
import { Client } from "../../application/domain/entities";
import { CreateClientUseCase } from "../../application/useCases/client/create-client";
import { CreateEntityController } from "./create-entity-controller";


describe("CreateEntityController class tests with CreateClientUseCase", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("should get a response entity with 201 status code", async () => {

        expect.assertions(4);
        const { repository, repositorySpy } = setupRepository<Client>("save")
        const sut = new CreateEntityController(new CreateClientUseCase(repository));

        const request = {
            body: {
                name: faker.name.findName(),
                cpf: "12345678911",
                birthDate: faker.date.past(20).toISOString(),
                email: faker.internet.email(),
            }
        };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        await sut.handle(request, response)

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

    test.each([
        {
            cpf: "12345678911",
            birthDate: faker.date.past(20).toISOString(),
            email: faker.internet.email()
        },
        {
            name: faker.name.findName(),
            cpf: "",
            birthDate: faker.date.past(20).toISOString(),
            email: faker.internet.email(),
        },
        {
            name: faker.name.findName(),
            cpf: "12345678911",
            birthDate: faker.date.past(18).toISOString(),
            email: "",
        },
        {
            name: faker.name.findName(),
            cpf: "12345678911",
            birthDate: "",
            email: faker.internet.email(),
        }
    ])("should receives a 400 status code", async (body) => {

        expect.assertions(4);
        const { repository, repositorySpy } = setupRepository<Client>("save")
        const sut = new CreateEntityController(new CreateClientUseCase(repository));

        const request = {
            body
        };
        const response = {
            json: jest.fn(() => response),
            status: jest.fn(() => response)
        };

        await sut.handle(request, response);

        expect(response.status).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledTimes(1);
        expect(repositorySpy).toHaveBeenCalledTimes(0);
    })
})