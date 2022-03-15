import supertest from "supertest";
import faker from "@faker-js/faker";
import { Client } from "../../../src/application/domain/entities";
import { Config } from "../../../src/main/config/config";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import EntityModelParser from "../../../src/presentation/adapters/entity-model-parser";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";

const server = Config.server;
const repository = Config.repositories.clientRepository;
describe("Tests for Client #GET controller controller", () => {

    const parser = new EntityModelParser();

    beforeEach(() => {
        Config.repositories.clientRepository = new IMRepository<Client>();
    })

    test("Should receive a 204 response code", async () => {
        expect.assertions(2);

        const response = await supertest(server).get("/api/clients");

        expect(response.status).toEqual(204);
        expect(response.text).toEqual("");
    });

    test("Should receive a 200 when GET to api/clients code and body contais a clients array", async () => {

        expect.assertions(2);
        const client = Client.create({
            name: faker.name.findName(),
            cpf: "12345678911",
            birthDate: "2020-01-01",
            email: "test@email.com",
        })
        repository.list.push(client)

        const response = await supertest(server).get("/api/clients");
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(200);
        expect(data).toEqual([parser.toModel(client)]);
    })

    test("Should receive a 200 when GET to api/clients/:id code and body contais a client", async () => {

        expect.assertions(2);
        const client = Client.create({
            name: faker.name.findName(),
            cpf: "12345678911",
            birthDate: "2020-01-01",
            email: "test@email.com",
        });
        repository.list.push(client)

        const response = await supertest(server).get(`/api/clients/${client.id}`);
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(200);
        expect(data).toEqual(parser.toModel(client));
    })

    test.each(["1"])("Should receive a 404 when GET to api/clients/:id", async (id) => {

        expect.assertions(2);

        const response = await supertest(server).get(`/api/clients/${id}`);
        const data = JSON.parse(response.text);

        expect(response.status).toEqual(404);
        expect(data).toEqual(ErrorMessage.ID_NOT_FOUND(id));
    })

})