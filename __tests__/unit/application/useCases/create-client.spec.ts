import { CreateClient } from "../../../../src/application/useCases/create-client";
import { IMClientRepository } from "../repositories/IM-ClientRepository";

describe("create client use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new client with valid data", async () => {

        expect.assertions(3);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);
        const spy = jest.spyOn(clientRepository, "save");

        const clientData = {
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        }

        const client = await createClient.execute(clientData);

        expect(client).toBeTruthy();
        expect(clientRepository.findById(client.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it("should not create a new client with invalid email", async () => {

        expect.assertions(2);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);
        const spy = jest.spyOn(clientRepository, "save");

        const clientData = {
            name: "Test",
            email: "",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        }

        try{
            await createClient.execute(clientData);
        }catch(err){
            expect(clientRepository.clientList.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it("should not create a new client with invalid cpf", async () => {

        expect.assertions(2);
        const clientRepository = new IMClientRepository();
        const createClient = new CreateClient(clientRepository);
        const spy = jest.spyOn(clientRepository, "save");

        const clientData = {
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "000000000"
        }

        try{
            await createClient.execute(clientData);
        }catch(err){
            expect(clientRepository.clientList.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})