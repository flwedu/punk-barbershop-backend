import IRepository from "../../../output/repositories/IRepository";
import { Barber } from "../../domain/entities";
import { InputBarberProps } from "../../domain/entities/barber";
import IUseCase from "../IUseCase";

type UpdateBarberRequest = {
    id: string,
    props: InputBarberProps
}

export default class UpdateBarberUseCase implements IUseCase {

    constructor(private readonly repository: IRepository<Barber>) { }

    async execute(data: UpdateBarberRequest) {
        await this.repository.findById(data.id);
        const { id, props: { ...props } } = data;

        const barber = Barber.create(props, id);
        return this.repository.update(barber, id);
    }
}
