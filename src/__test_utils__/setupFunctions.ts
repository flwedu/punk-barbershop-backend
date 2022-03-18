import { Entity } from "../application/domain/entities/Entity";
import { IMRepository } from "../output/repositories/test/IM-Repository";

export function setupRepository<T extends Entity>(spyRepositoryMethod: jest.FunctionPropertyNames<Required<IMRepository<Entity>>>) {
    const repository = new IMRepository<T>();
    const method = spyRepositoryMethod;
    const repositorySpy = jest.spyOn(repository, method);

    return {
        repository,
        repositorySpy,
    };
}