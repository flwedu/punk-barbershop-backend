import faker from "@faker-js/faker";
import supertest from "supertest";
import { Barber } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { Config } from "../../../src/main/config/config";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { createFakeBarberProps } from "../../../src/__test_utils__/MockDataFactory"

describe("Tests for Barber #POST controller controller", () => {

    const server = Config.server;
    const repository = Config.repositories.barberRepository;
    const parser = new EntityModelParser();

    beforeEach(() => {
        Config.repositories.barberRepository = new IMRepository<Barber>();
    })

    test.skip("Should return 201 and body should contains the data about created baber", async () => {

        const requestData = {
            ...createFakeBarberProps()
        }
        const response = await supertest(server).post("/api/babers").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(201);
        expect(data).toEqual(parser.toModel(repository.list.at(0)));
        expect(data).toMatchObject({ ...requestData });
    })

    test.skip.each([[{
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

        const response = await supertest(server).post("/api/babers").send(requestData);
        const data = JSON.parse(response.text);

        expect(response.statusCode).toEqual(400);
        expect(data).toEqual(message);
    })
})