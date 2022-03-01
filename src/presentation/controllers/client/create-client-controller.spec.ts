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

    it.each([{
        name: "Test",
        cpf: "",
        birthDate: "2020-01-01",
        email: "test@email.com",
    },
    {
        name: "Test",
        cpf: "12345678911",
        birthDate: "2020-01-01",
        email: "",
    },
    {

        name: "Test",
        cpf: "12345678911",
        birthDate: "",
        email: "test@email.com",
    }
    ])("should get a response entity with 400 status code", async (props) => {

        expect.assertions(2);

        const { repository, sut } = setup();
        const response = await sut.handle({
            props
        })

        expect(response.status).toEqual(400);
        expect(repository.list.length).toEqual(0);
    })

})