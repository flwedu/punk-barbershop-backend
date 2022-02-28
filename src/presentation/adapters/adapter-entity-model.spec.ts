import { Cpf } from "../../application/domain/valueObjects/Cpf";
import { Duration } from "../../application/domain/valueObjects/Duration";
import EntityModelAdapter from "./adapter-entity-model"

describe("entity model adapter", () => {

    it("should convert all date props correctly", () => {

        const sut = new EntityModelAdapter();
        const entity = {
            id: "1",
            props: {
                birthDate: new Date("2021-01-01T14:00:00.000Z")
            }
        }

        const model = sut.toModel(entity);

        expect(model).toEqual({
            "id": "1",
            "birthDate": "2021-01-01T14:00:00.000Z"
        })
    })

    it("should convert all object props correctly", () => {

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