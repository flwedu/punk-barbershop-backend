import { IMRepository } from "../../../output/repositories/test/IM-Repository"
import { Client } from "../../domain/entities/client"
import UpdateClientUseCase from "./update-client";

describe("Update client use case", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Sould return the update a client", async () => {

        expect.assertions(3);
        const repository = new IMRepository<Client>();
        const sut = new UpdateClientUseCase(repository);
        const repositorySpy = jest.spyOn(repository, "update");

        const client = Client.create({
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        }, "1");
        repository.list.push(client)

        expect(repository.list.at(0).props.name).toEqual("Test");
        sut.execute({
            id: "1",
            props: {
                name: "Updated test",
                email: "aa@email.com",
                birthDate: "01/01/2021",
                cpf: "00000000000"
            }
        })
        expect(repositorySpy).toBeCalledTimes(1);
        expect(repository.list.at(0).props.name).toEqual("Updated test");
    })
})