import IRepository from "../../output/repositories/IRepository";
import { Entity } from "../domain/entities/Entity";
import IUseCase from "./IUseCase";

type FindByIdQuery = {
    id: string
}

export class FindByIdUseCase<T extends Entity> implements IUseCase {

    constructor(private readonly repository: IRepository<T>) { }

    async execute(data: FindByIdQuery): Promise<T> {
        return this.repository.findById(data.id);
    };
}