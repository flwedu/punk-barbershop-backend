import supertest from "supertest";
import crypto from "crypto";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import { createFakeClient } from "../../../src/__test_utils__/MockDataFactory";

describe("Tests for Client #DELETE controller", () => {

    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Client");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Client>());
    })

    test("Should return 202 and body contais the id of deleted resource", async () => {

        expect.assertions(2);
        const resource = createFakeClient();
        const id = await repository.save(resource);

        const response = await supertest(app.getServer()).delete(`/api/clients/${id}`).send();

        expect(response.statusCode).toEqual(202);
        expect(response.body).toEqual(`element ${id} deleted`);
    })

    test.each(["1", crypto.randomUUID()])("Should return 404 for a non existent resource id", async (id) => {

        expect.assertions(2);

        const response = await supertest(app.getServer()).delete(`/api/clients/${id}`).send();

        expect(response.statusCode).toEqual(404);
        expect(response.body).toEqual(ErrorMessage.ID_NOT_FOUND(id));
    })
})