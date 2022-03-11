import faker from "@faker-js/faker";
import { Cpf } from "../../application/domain/valueObjects/Cpf";
import { Duration } from "../../application/domain/valueObjects/Duration";
import EntityModelAdapter from "./entity-model-parser"

describe("entity model adapter", () => {

    it.each([faker.date.past(), faker.date.past(10), faker.date.recent()])("Should convert all properties correctly", (birthDate) => {

        const sut = new EntityModelAdapter();
        const entity = {
            id: "1",
            props: {
                birthDate
            }
        }

        const model = sut.toModel(entity);

        expect(model).toEqual({
            "id": "1",
            "birthDate": birthDate.toISOString()
        })
    })

    it("Should convert all properties (object) correctly", () => {

        const sut = new EntityModelAdapter();
        const entity = {
            id: "1",
            props: {
                cpf: Cpf.of("12345678911"),
                duration: Duration.of("90")
            }
        }

        const model = sut.toModel(entity);

        expect(model).toEqual({
            "id": "1",
            "cpf": "12345678911",
            duration: "90"
        })
    })
})