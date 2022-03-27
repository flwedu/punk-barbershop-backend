import supertest from "supertest";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeClient } from "../../../src/__test_utils__/MockDataFactory";

describe("Tests for Client #GET controller", () => {

    const parser = new EntityModelParser();
    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Client");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Client>());
    })

    test("Should receive a 204 response code", async () => {
        expect.assertions(2);

        const response = await supertest(app.getServer().listen()).get("/api/clients");

        expect(response.status).toEqual(204);
        expect(response.body).toEqual({});
    });

    test("Should receive a 200 when GET to api/clients code and body contais a clients array", async () => {

        expect.assertions(2);
        const client = createFakeClient();
        await repository.save(client);

        const response = await supertest(app.getServer().listen()).get("/api/clients");

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject([parser.toModel(client)]);
    })

    test("Should receive a 200 when GET to api/clients/:id code and body contais a client", async () => {

        expect.assertions(2);
        const client = createFakeClient();
        await repository.save(client);

        const response = await supertest(app.getServer().listen()).get(`/api/clients/${client.id}`);

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(parser.toModel(client));
    })

    test.each(["1"])("Should receive a 404 when GET to api/clients/:id", async (id) => {

        expect.assertions(2);

        const response = await supertest(app.getServer().listen()).get(`/api/clients/${id}`).send();

        expect(response.status).toEqual(404);
        expect(response.body).toEqual(ErrorMessage.ID_NOT_FOUND(id));
    })

})