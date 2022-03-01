import { Client } from "../../application/domain/entities/client";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import { FindAllController } from "./findall-controller";

describe("find all entities controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })


    it("should return 204 and a empty data body", async () => {

        expect.assertions(3);
        const repository = new IMRepository<Client>();
        const sut = new FindAllController(repository);
        const repositorySpy = jest.spyOn(repository, "findAll");

        const responseEntity = await sut.handle();

        expect(responseEntity.status).toEqual(204);
        expect(responseEntity.data.length).toEqual(0);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

    it("should return 200 and a filled data body", async () => {

        expect.assertions(3);
        const repository = new IMRepository<Client>();
        const repositorySpy = jest.spyOn(repository, "findAll");

        repository.list.push(Client.create({
            name: "test",
            birthDate: "2021-01-01",
            cpf: "12345678911",
            email: "test@email.com"
        }))
        const sut = new FindAllController(repository);

        const responseEntity = await sut.handle();

        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.length).toEqual(1);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    })

})