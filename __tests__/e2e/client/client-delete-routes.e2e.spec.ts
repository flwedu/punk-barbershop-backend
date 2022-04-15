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

    describe('Should return 202: ', () => {

        test("and body contais the id of deleted resource", async () => {

            expect.assertions(2);
            const resource = createFakeClient();
            const id = await repository.save(resource, resource.id);

            const response = await supertest(app.getServer()).delete(`/api/clients/${id}`).send();

            expect(response.statusCode).toEqual(202);
            expect(response.body).toEqual(`element ${id} deleted`);
        })
    })

    describe('Should return 404: ', () => {

        test.each(["1", crypto.randomUUID()])("for a non existent resource id", async (id) => {

            expect.assertions(2);

            const response = await supertest(app.getServer()).delete(`/api/clients/${id}`).send();

            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(ErrorMessage.ID_NOT_FOUND(id));
        })
    })
})