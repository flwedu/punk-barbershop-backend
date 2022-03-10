import faker from "@faker-js/faker";
import supertest from "supertest";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { Config } from "../../../src/main/config/config";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";

describe("Tests for Client #POST controller controller", () => {

    const server = Config.server;
    const repository = Config.repositories.clientRepository;
    const parser = new EntityModelParser();

    beforeEach(() => {
        Config.repositories.clientRepository = new IMRepository<Client>();
    })

    test("Should return 201 and body should contains the data about created client", async () => {

        const requestData = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            cpf: "00011122233",
            birthDate: faker.date.past(20).toISOString(),
        }
        const response = await supertest(server).post("/api/clients").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(201);
        expect(data).toEqual(parser.toModel(repository.list.at(0)));
        expect(data).toMatchObject({ ...requestData });
    })

    test.each([[{
        name: faker.name.findName(),
        cpf: "00011122233",
        birthDate: faker.date.past(20).toISOString(),
    }, ErrorMessage.INVALID_PARAM("e-mail")],
    [{
        email: faker.internet.email(),
        cpf: "00011122233",
        birthDate: faker.date.past(20).toISOString(),
    }, ErrorMessage.INVALID_PARAM("name")],
    [{
        name: faker.name.findName(),
        email: faker.internet.email(),
        birthDate: faker.date.past(20).toISOString(),
    }, ErrorMessage.INVALID_PARAM("CPF")]
    ])("Should return 400 and body is $1", async (requestData, message) => {

        const response = await supertest(server).post("/api/clients").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(400);
        expect(data).toEqual(message);
    })
})