import supertest from "supertest";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeClientProps } from "../../../src/__test_utils__/MockDataFactory";

describe("Tests for Client #POST controller", () => {

    const parser = new EntityModelParser();
    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Client");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Client>());
    })

    describe('Should return 201: ', () => {

        test("and body should contains the id of created client", async () => {

            expect.assertions(2);
            const requestData = {
                id: "1",
                ...createFakeClientProps()
            }
            const response = await supertest(app.getServer()).post("/api/clients").send(requestData);

            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(requestData.id);
        })
    })

    describe('Should return 400', () => {

        const data = createFakeClientProps();

        test.each([[{
            name: data.name,
            cpf: data.cpf,
            birthDate: data.birthDate,
        }, ErrorMessage.NULL_PARAM("email")],
        [{
            email: data.email,
            cpf: data.cpf,
            birthDate: data.birthDate,
        }, ErrorMessage.NULL_PARAM("name")],
        [{
            name: data.name,
            email: data.email,
            birthDate: data.birthDate,
        }, ErrorMessage.NULL_PARAM("cpf")]
        ])("and body is $1 for missing input param", async (requestData, message) => {

            expect.assertions(2);
            const response = await supertest(app.getServer()).post("/api/clients").send(requestData);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual(message);
        })
    })
})