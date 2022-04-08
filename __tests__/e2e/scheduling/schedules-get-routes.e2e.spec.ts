import supertest from "supertest";
import crypto from "crypto";
import { Scheduling } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeScheduling } from "../../../src/__test_utils__/MockDataFactory";

describe("Tests for Scheduling #GET controller", () => {

    const parser = new EntityModelParser();
    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Scheduling");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Scheduling>());
    })

    test("Should receive a 204 response code and an empty response body", async () => {
        expect.assertions(2);

        const response = await supertest(app.getServer().listen()).get("/api/schedules");

        expect(response.status).toEqual(204);
        expect(response.body).toEqual({});
    });

    test("Should receive a 200 response code when #GET to /api/schedules and body contais an array", async () => {

        expect.assertions(2);
        const resource = createFakeScheduling();
        await repository.save(resource);

        const response = await supertest(app.getServer().listen()).get("/api/schedules");

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject([parser.toModel(resource)]);
    })

    test("Should receive a 200 when #GET to /api/schedules/:id code and body contais a resource", async () => {

        expect.assertions(2);
        const resource = createFakeScheduling();
        await repository.save(resource);

        const response = await supertest(app.getServer().listen()).get(`/api/schedules/${resource.id}`);

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(parser.toModel(resource));
    })

    test.each([crypto.randomUUID()])("Should receive a 404 when #GET to api/clients/:id for a non-existent id", async (id) => {

        expect.assertions(2);

        const response = await supertest(app.getServer().listen()).get(`/api/schedules/${id}`).send();

        expect(response.status).toEqual(404);
        expect(response.body).toEqual(ErrorMessage.ID_NOT_FOUND(id));
    })

})