import { Client } from "../application/domain/entities/"
import { EntityFactory } from "./EntityWrapper"
import { createFakeClientProps } from "../__test_utils__/MockDataFactory"

describe("EntityFactory class tests", () => {

    test("Should return the correct client", () => {

        const factory = new EntityFactory(Client);
        const result = factory.create(createFakeClientProps());

        expect(result).toMatchObject({ ...Client })
    })
})