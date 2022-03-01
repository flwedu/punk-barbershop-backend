import { Client } from "../../../application/domain/entities/client";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import CreateClientController from "./create-client-controller";

describe("create client controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    function setup() {
        const repository = new IMRepository<Client>();
        const sut = new CreateClientController(repository);

        return { repository, sut };
    }

    it("should get a response entity with 201 status code", async () => {

        expect.assertions(2);

        const { repository, sut } = setup();
        const response = await sut.handle({
            props: {
                name: "Test",
                cpf: "12345678911",
                birthDate: "2020-01-01",
                email: "test@email.com",
            }
        })

        expect(response.status).toEqual(201);
        expect(repository.list.length).toEqual(1);
    })

    it("should get a response entity with 400 status code", async () => {

        expect.assertions(4);

        const { repository, sut } = setup();
        const response = await sut.handle({
            props: {
                name: "Test",
                cpf: "",
                birthDate: "2020-01-01",
                email: "test@email.com",
            }
        })

        const response2 = await sut.handle({
            props: {
                name: "Test",
                cpf: "12345678911",
                birthDate: "2020-01-01",
                email: "",
            }
        })

        const response3 = await sut.handle({
            props: {
                name: "Test",
                cpf: "12345678911",
                birthDate: "",
                email: "test@email.com",
            }
        })

        expect(response.status).toEqual(400);
        expect(response2.status).toEqual(400);
        expect(response3.status).toEqual(400);
        expect(repository.list.length).toEqual(0);
    })

})