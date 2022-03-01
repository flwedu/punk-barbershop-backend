import IUseCase from "../../application/useCases/IUseCase";
import IRepository from "../../output/repositories/IRepository";


export class FindAllUseCase implements IUseCase {

    constructor(private readonly repository: IRepository<any>) { }

    execute(): Promise<any> {
        return this.repository.findAll();
    };
}
