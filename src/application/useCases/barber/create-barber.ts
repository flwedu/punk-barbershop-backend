import { Barber, InputBarberProps } from "../../domain/entities/barber";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

export type CreateBarberRequest = {
    id?: string,
    props: InputBarberProps
}

export class CreateBarberUseCase implements IUseCase {

    constructor(private repository: IRepository<Barber>) { }

    async execute(data: CreateBarberRequest) {

        const barber = Barber.create(data.props, data.id);
        return this.repository.save(barber, barber.id);
    }
}