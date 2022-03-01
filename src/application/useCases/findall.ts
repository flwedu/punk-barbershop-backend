import IUseCase from "../../application/useCases/IUseCase";
import IRepository from "../../output/repositories/IRepository";
import { Entity } from "../domain/entities/Entity";


export class FindAllUseCase<T extends Entity> implements IUseCase {

    constructor(private readonly repository: IRepository<T>) { }

    execute(): Promise<T[]> {
        return this.repository.findAll();
    };
}
