import { Client, InputClientProps } from "../../domain/entities/client";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

type UpdateRequest = {
    id: string,
    props: InputClientProps
}

export default class UpdateClientUseCase implements IUseCase {

    constructor(private readonly repository: IRepository<Client>) { }

    async execute(data: UpdateRequest) {

        await this.repository.findById(data.id);
        const client = Client.create(data.props, data.id)
        return this.repository.update(client, data.id);
    }
}