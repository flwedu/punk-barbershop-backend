import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceTypeRepository } from "../repositories/ServiceTypeRepository";
import { ClientRepository } from "../repositories/ClientRepository"
import { BarberRepository } from "../repositories/BarberRepository"
import { Maybe } from "../../util/Maybe";

type CreateSchedulingRequest = {
    clientId: string,
    barberId: string,
    scheduleDate: Date,
    serviceTypeId: string,
}

export class CreateScheduling {

    constructor(
        private clientRepository: ClientRepository,
        private barberRepository: BarberRepository,
        private serviceTypeRepository: ServiceTypeRepository
    ) { }

    async execute({ barberId, clientId, scheduleDate, serviceTypeId }: CreateSchedulingRequest) {

        const client = Maybe.of(await this.clientRepository.findById(clientId));

        if (client.isEmpty()) {
            throw new Error("Client not found")
        }

        const barber = Maybe.of(await this.barberRepository.findById(barberId));

        if (barber.isEmpty()) {
            throw new Error("Barber not found")
        }

        const serviceType = Maybe.of(await this.serviceTypeRepository.findById(serviceTypeId));

        if (serviceType.isEmpty()) {
            throw new Error("Service type not found")
        }

        const scheduling = Scheduling.create({
            clientId,
            barberId,
            scheduleDate,
            createdAt: new Date(),
            serviceTypeId
        })

        return scheduling;
    }
}