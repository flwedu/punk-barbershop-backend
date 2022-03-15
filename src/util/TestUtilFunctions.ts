import { Entity } from "../application/domain/entities/Entity";
import { IMRepository } from "../output/repositories/test/IM-Repository";

export function setupRepository(repositoryType: any, method: jest.FunctionPropertyNames<Required<IMRepository<Entity>>>) {
    const repository = new IMRepository<typeof repositoryType>();
    const repositorySpy = jest.spyOn(repository, method);

    return {
        repository,
        repositorySpy,
    };
}