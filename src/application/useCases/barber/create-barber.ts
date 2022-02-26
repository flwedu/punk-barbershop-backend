import { Barber, InputBarberProps } from "../../../domain/entities/barber";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

export class CreateBarberUseCase implements IUseCase {

    constructor(private repository: IRepository<Barber>) { }

    async execute(request: InputBarberProps) {

        return this.repository.save(request);
    }
}