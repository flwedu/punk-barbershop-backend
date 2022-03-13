import { IMRepository } from "../../../output/repositories/test/IM-Repository"
import { Client } from "../../domain/entities/client"
import UpdateClientUseCase from "./update-client";

describe("Update client use case tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    function setup() {
        const repository = new IMRepository<Client>();
        const sut = new UpdateClientUseCase(repository);
        const repositorySpy = jest.spyOn(repository, "update");

        return { repository, sut, repositorySpy };
    }

    it("Should return a client with all updated parameters", async () => {

        expect.assertions(2);
        const { repository, sut, repositorySpy } = setup();

        const client = Client.create({
            name: "Test",
            email: "aa@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        }, "1");
        repository.list.push(client)

        const updated = await sut.execute({
            id: "1",
            props: {
                name: "Updated test",
                email: "updated@email.com",
                birthDate: "02/01/2021",
                cpf: "00000000001"
            }
        })

        const updatedAtList = repository.list.at(0);
        expect(repositorySpy).toBeCalledTimes(1);
        expect(updatedAtList).toEqual(updated);
    })
})