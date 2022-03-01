import IRepository from "../../../output/repositories/IRepository";
import { Client, InputClientProps } from "../../domain/entities/client";
import IUseCase from "../IUseCase";

type UpdateClientRequest = {
    id: string,
    props: InputClientProps
}

export default class UpdateClientUseCase implements IUseCase {

    constructor(private readonly repository: IRepository<Client>) { }

    async execute(data: UpdateClientRequest) {
        const { id, props: { ...props } } = data;

        const client = Client.create(props, id)
        return this.repository.update(client, id);
    }
}