import IRepository from "../../output/repositories/IRepository";
import { Entity } from "../domain/entities/Entity";
import IUseCase from "./IUseCase";

type DeleteByIdQuery = {
    id: string,
}

export class DeleteByIdUseCase<T extends Entity> implements IUseCase {

    constructor(private readonly repository: IRepository<T>) { }

    async execute(data: DeleteByIdQuery): Promise<void> {
        return this.repository.delete(data.id);
    };

}