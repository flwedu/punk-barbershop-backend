import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceTypeRepository } from "../repositories/ServiceTypeRepository";
import { ClientRepository } from "../repositories/ClientRepository"
import { BarberRepository } from "../repositories/BarberRepository"

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

        const client = await this.clientRepository.findById(clientId);

        if (!client) {
            throw new Error("Client not found")
        }

        const barber = await this.barberRepository.findById(barberId);

        if (!barber) {
            throw new Error("Barber not found")
        }

        const serviceType = await this.serviceTypeRepository.findById(serviceTypeId);

        if (!serviceType) {
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