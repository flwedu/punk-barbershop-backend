import faker from "@faker-js/faker";
import supertest from "supertest";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeClientProps } from "../../../src/__test_utils__/MockDataFactory"

describe("Tests for Client #POST controller controller", () => {

    const parser = new EntityModelParser();
    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Client");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Client>());
    })

    test("Should return 201 and body should contains the id of created client", async () => {

        const requestData = {
            id: "1",
            ...createFakeClientProps()
        }
        const response = await supertest(app.getServer()).post("/api/clients").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(201);
        expect(data).toEqual(requestData.id);
        expect(data).toEqual(expect.any(String));
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

        const response = await supertest(app.getServer()).post("/api/clients").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(400);
        expect(data).toEqual(message);
    })
})