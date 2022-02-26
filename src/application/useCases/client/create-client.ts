import { Client, InputClientProps } from "../../../domain/entities/client";
import { Cpf } from "../../../domain/valueObjects/Cpf";
import { Email } from "../../../domain/valueObjects/Email";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

export class CreateClientUseCase implements IUseCase {

    constructor(private repository: IRepository<Client>) { }

    async execute(data: InputClientProps) {

        return this.repository.save(data);
    }
}