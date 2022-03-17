import { createFakeClient, createFakeClientProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { Client } from "../../domain/entities/client";
import { ErrorMessage } from "../../domain/errors/error-messages";
import UpdateClientUseCase from "./update-client";

describe("Update client use case tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should return a client with all updated parameters", async () => {

        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository(Client, "update");
        const sut = new UpdateClientUseCase(repository);

        const client = createFakeClient();
        await repository.save(client)

        const updated = await sut.execute({
            id: client.id,
            props: {
                ...createFakeClientProps()
            }
        })

        expect(repositorySpy).toBeCalledTimes(1);
        expect(await repository.findById(client.id)).toMatchObject(updated);
    })

    test.each(["1", null, undefined, ""])("Should throw an error when trying to update a inexistent client", async (id) => {

        expect.assertions(2);
        const { repository, repositorySpy } = setupRepository(Client, "update");
        const sut = new UpdateClientUseCase(repository);

        try {
            await sut.execute({ id, props: createFakeClientProps() })
        } catch (err) {
            expect(err.message).toEqual(ErrorMessage.ID_NOT_FOUND(id));
            expect(repositorySpy).not.toHaveBeenCalled();
        }
    })
})