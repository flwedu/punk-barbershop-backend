import { Barber } from "../../../domain/entities/barber";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

type CreateBarberRequest = {
    name: string;
    email: string;
    birthDate: string;
    cpf: string;
}

export class CreateBarberUseCase implements IUseCase {

    constructor(private repository: IRepository<Barber>) { }

    async execute(request: CreateBarberRequest) {

        return this.repository.save(request);
    }
}