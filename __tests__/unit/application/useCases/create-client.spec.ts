import { CreateClient } from "../../../../src/application/useCases/create-client";
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

        const client = await createClient.execute(clientData);

        expect(client).toBeTruthy()
    })

    it("should not create a new client with invalid email", async () => {

        expect.assertions(1);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);

        const clientData = {
            name: "Test",
            email: "",
            birthDate: "01/01/2021",
            cpf: "000.000.000-00"
        }

        try{
            const client = await createClient.execute(clientData);
            console.log(client)
        }catch(err){
            expect(true).toBeTruthy()
            
        }

    })
})