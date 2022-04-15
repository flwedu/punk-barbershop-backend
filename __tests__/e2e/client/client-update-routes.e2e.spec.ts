import supertest from "supertest";
import { Client } from "../../../src/application/domain/entities";
import { ErrorMessage } from "../../../src/application/domain/errors/error-messages";
import { testInMemoryAppConfiguration } from "../../../src/main/config/test-configuration";
import { IMRepository } from "../../../src/output/repositories/test/IM-Repository";
import { createFakeClient, createFakeClientProps } from "../../../src/__test_utils__/MockDataFactory";

describe("Tests for Client #UPDATE controller", () => {

    const app = testInMemoryAppConfiguration;
    const repository = app.getRepository("Client");

    beforeEach(() => {
        app.setRepository("Client", new IMRepository<Client>());
    })

    describe('Should return 202: ', () => {

        test("body should contains the id of updated client", async () => {

            expect.assertions(2);
            const original = createFakeClient();
            const originalId = await repository.save(original, original.id);
            const requestData = {
                ...createFakeClientProps()
            }
            const response = await supertest(app.getServer()).put(`/api/clients/${originalId}`).send(requestData);

            expect(response.statusCode).toEqual(202);
            expect(response.body).toEqual(originalId);
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
            const original = createFakeClient();
            const originalId = await repository.save(original, original.id);
            const response = await supertest(app.getServer()).put(`/api/clients/${originalId}`).send(requestData);
            const data = JSON.parse(response.text);

            expect(response.statusCode).toEqual(400);
            expect(data).toEqual(message);
        })
    })

    describe('Should return 404', () => {

        test.each(["1"])("for a inexistent resource id", async (id) => {

            expect.assertions(2);
            const requestData = {
                ...createFakeClientProps()
            }
            const response = await supertest(app.getServer()).put(`/api/clients/${id}`).send(requestData);

            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(ErrorMessage.ID_NOT_FOUND(id));
        })
    })

})