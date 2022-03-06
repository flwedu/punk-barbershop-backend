import { Config } from "../src/main/config/config";
import { IMRepository } from "../src/output/repositories/test/IM-Repository"
import { Client } from "../src/application/domain/entities"
import axios from "axios";

describe.skip("Tests for client controller", () => {

    const URL = "http://localhost:4000/api/clients"
    const server = Config.server;
    const repository = Config.repositories.clientRepository;
    const httpClient = axios.create({ baseURL: URL });

    beforeAll(() => {
        server.listen(4000);
    });

    beforeEach(() => {
        Config.repositories.clientRepository = new IMRepository<Client>();
    })

    afterAll(() => {
    })

    it("Sould receive a 204 response code", async () => {

        const response = await httpClient.get("");

        expect(response.status).toEqual(204);
        expect(response.data).toBeFalsy();
    });

    it("Sould receive a 200 response code and body contais a clients array", async () => {

        repository.list.push(Client.create({
            name: "Test",
            cpf: "12345678911",
            birthDate: "2020-01-01",
            email: "test@email.com",
        }))
        const response = await httpClient.get("");

        expect(response.status).toEqual(200);
        expect(response.data).toBeTruthy();
    })

})