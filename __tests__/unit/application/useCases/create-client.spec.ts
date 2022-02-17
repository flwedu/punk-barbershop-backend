import { CreateClient } from "../../../../src/application/useCases/create-client";
import { Maybe } from "../../../../src/util/Maybe";
import { IMClientRepository } from "../repositories/IM-ClientRepository";

describe("create client use cases", () => {

    it("should create a new client with valid data", async () => {

        expect.assertions(1);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);

        const clientData = {
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "000.000.000-00"
        }

        const client = Maybe.of(await createClient.execute(clientData));

        expect(client.isPresent()).toBeTruthy()
    })

    it("should not create a new client with invalid email", async () => {

        expect.assertions(1);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);

        const clientData = {
            name: "Test",
            email: "aaemail.com",
            birthDate: "01/01/2021",
            cpf: "000.000.000-00"
        }

        const client = Maybe.of(await createClient.execute(clientData));

        expect(client.isPresent()).toBeFalsy()
    })
})