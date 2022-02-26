import { Barber, InputBarberProps } from "../../../domain/entities/barber";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

export class CreateBarberUseCase implements IUseCase {

    constructor(private repository: IRepository<Barber>) { }

    async execute(data: InputBarberProps) {

        const barber = Barber.create(data);
        return this.repository.save(barber);
    }
}