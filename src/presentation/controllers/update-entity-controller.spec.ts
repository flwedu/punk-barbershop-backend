import { Client } from "../../application/domain/entities";
import UpdateClientUseCase from "../../application/useCases/client/update-client";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import faker from "@faker-js/faker";
import UpdateEntityController from "./update-entity-controller";

describe("Update entity controller class tests: ", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each(["1", "4545612"])(
        "should receive 202 for UpdateClientUseCase",
        async (id) => {
            const repository = new IMRepository<Client>();
            const sut = new UpdateEntityController<Client>(
                new UpdateClientUseCase(repository)
            );
            const repositorySpy = jest.spyOn(repository, "update");

            const props = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                cpf: "12345678911",
                birthDate: faker.date.recent().toISOString(),
            };
            repository.list.push(Client.create(props, id));

            const request = {
                params: {
                    id,
                },
                body: { ...props },
            };
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => response),
            };

            await sut.handle(request, response);

            expect(response.status).toHaveBeenCalledTimes(1);
            expect(response.status).toHaveBeenCalledWith(202);
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        }
    );
});
