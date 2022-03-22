import supertest from "supertest";
import { Barber } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { Config } from "../../../src/main/config/config";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeBarber } from "../../../src/__test_utils__/MockDataFactory";

const server = Config.server;
const repository = Config.repositories.barberRepository;
describe("Tests for Barber #GET controller controller", () => {

    const parser = new EntityModelParser();

    beforeEach(() => {
        Config.repositories.barberRepository = new IMRepository<Barber>();
    })

    test("Should receive a 204 response code", async () => {
        expect.assertions(2);

        const response = await supertest(server).get("/api/barbers");

        expect(response.status).toEqual(204);
        expect(response.text).toEqual("");
    });

    test("Should receive a 200 when GET to api/barbers code and body contais a barbers array", async () => {

        expect.assertions(2);
        const barber = createFakeBarber();
        await repository.save(barber);

        const response = await supertest(server).get("/api/barbers");
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(200);
        expect(data).toEqual([parser.toModel(barber)]);
    })

    test("Should receive a 200 when GET to api/barbers/:id code and body contais a barber", async () => {

        expect.assertions(2);
        const barber = createFakeBarber();
        await repository.save(barber);

        const response = await supertest(server).get(`/api/barbers/${barber.id}`);
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(200);
        expect(data).toEqual(parser.toModel(barber));
    })

    test.each(["1"])("Should receive a 404 when GET to api/barbers/:id", async (id) => {

        expect.assertions(2);

        const response = await supertest(server).get(`/api/barbers/${id}`);
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(404);
        expect(data).toEqual(ErrorMessage.ID_NOT_FOUND(id));
    })

})