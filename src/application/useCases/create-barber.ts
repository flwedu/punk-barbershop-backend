import { Barber } from "../../domain/entities/barber";
import { Cpf } from "../../domain/valueObjects/Cpf";
import { Email } from "../../domain/valueObjects/Email";
import IRepository from "../repositories/IRepository";

type CreateBarberRequest = {
    name: string;
    email: string;
    birthDate: string;
    cpf: string;
}

export class CreateBarber {

    constructor(private repository: IRepository<Barber>) { }

    async execute(request: CreateBarberRequest) {

        const barberProps = {
            ...request,
            email: Email.of(request.email),
            cpf: Cpf.of(request.cpf),
            birthDate: new Date(request.birthDate),
            createdAt: new Date(),
        };
        return await this.repository.save(barberProps);
    }
}