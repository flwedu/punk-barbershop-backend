import { Config } from "../src/main/config/config";
import {IMRepository} from "../src/output/repositories/test/IM-Repository"
import {Client} from "../src/application/domain/entities"
import axios from "axios";

describe("Tests for client controller", () => {

    const URL = "http://localhost:3000/api/clients"
    const server = Config.server;
    const repository = Config.repositories.clientRepository;
    const httpClient = axios.create({baseURL: URL});
    
    beforeAll(() => {
        server.listen(3000);
    });
    
    beforeEach(() => {
        Config.repositories.clientRepository = new IMRepository<Client>();
    })

    it("Sould return a 204 response code", async () => {
        
        const response = await httpClient.get("");

        expect(response.status).toEqual(204);
        expect(response.data).toEqual("");
    })

    it("Sould return a 200 response code and body contais a clients array", async () => {
        
        repository.list.push(Client.create({
            props: {
                name: "Test",
                cpf: "12345678911",
                birthDate: "2020-01-01",
                email: "test@email.com",
            }
        }))
        const response = await httpClient.get("");

        console.log(response);
        expect(response.status).toEqual(200);
    })

})