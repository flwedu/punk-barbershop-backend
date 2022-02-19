import { Cpf } from "../../domain/valueObjects/Cpf";
import { Email } from "../../domain/valueObjects/Email";
import { BarberRepository } from "../repositories/BarberRepository";

type CreateBarberRequest = {
    name: string;
    email: string;
    birthDate: string;
    cpf: string;
}

export class CreateBarber {

    constructor(private barberRepository: BarberRepository){}

    async execute(request: CreateBarberRequest){

        const barberProps = {
            ...request,
            email: Email.of(request.email),
            cpf: Cpf.of(request.cpf),
            birthDate: new Date(request.birthDate),
            createdAt: new Date(),
        };
        return await this.barberRepository.save(barberProps);
    }
}