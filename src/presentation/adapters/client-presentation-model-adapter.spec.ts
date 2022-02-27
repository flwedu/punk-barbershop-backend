import { Client } from "../../domain/entities/client";
import { ClientPresentationModelAdapter } from "./client-presentation-model-adapter"

describe("client presentation model adapter", () => {

    it("should return a model", () => {

        const sut = new ClientPresentationModelAdapter();
        const inputProps = {
            id: "1",
            cpf: "12345678911",
            name: "Test",
            email: "test@email.com",
            birthDate: "2020-01-01",
        }
        const client = Client.create(inputProps);
        const model = sut.toModel(client);

        expect(model.id).toEqual(inputProps.id);
        expect(model.name).toEqual(inputProps.name);
        expect(model.cpf).toEqual(inputProps.cpf);
        expect(model.email).toEqual(inputProps.email);
    })
})