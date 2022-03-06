import { Client } from "../../../application/domain/entities/client";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { CreateClientController } from "./";

describe("create client controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    function setup() {
        const repository = new IMRepository<Client>();
        const repositorySpy = jest.spyOn(repository, "save");
        const sut = new CreateClientController(repository);

        return { repository, sut, repositorySpy };
    }

    it("should get a response entity with 201 status code", async () => {

        expect.assertions(4);

        const { sut, repositorySpy } = setup();
        const request = {
            body: {
                name: "Test",
                cpf: "12345678911",
                birthDate: "2020-01-01",
                email: "test@email.com",
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

    it.each([{
        name: "Test",
        cpf: "",
        birthDate: "2020-01-01",
        email: "test@email.com",
    },
    {
        name: "Test",
        cpf: "12345678911",
        birthDate: "2020-01-01",
        email: "",
    },
    {
        name: "Test",
        cpf: "12345678911",
        birthDate: "",
        email: "test@email.com",
    }
    ])("should receives a 400 status code", async (body) => {

        expect.assertions(4);
        const { sut, repositorySpy } = setup();
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