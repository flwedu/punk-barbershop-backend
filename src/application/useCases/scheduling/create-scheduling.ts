import { Barber } from "../../../domain/entities/barber";
import { Client } from "../../../domain/entities/client";
import { Scheduling } from "../../../domain/entities/scheduling";
import { ServiceType } from "../../../domain/entities/serviceType";
import DateTime from "../../../domain/valueObjects/DateTime";
import Maybe from "../../../util/Maybe";
import IRepository from "../../repositories/IRepository";

type SchedulingRepositoriesDependencies = {
    clientRepository: IRepository<Client>,
    barberRepository: IRepository<Barber>,
    serviceTypeRepository: IRepository<ServiceType>,
    schedulingRepository: IRepository<Scheduling>
}

type CreateSchedulingRequest = {
    clientId: string,
    barberId: string,
    scheduleDate: string,
    serviceTypeId: string,
}

export class CreateScheduling {

    private clientRepository: IRepository<Client>
    private barberRepository: IRepository<Barber>
    private serviceTypeRepository: IRepository<ServiceType>
    private schedulingRepository: IRepository<Scheduling>

    constructor(repositoriesList: SchedulingRepositoriesDependencies) {
        Object.assign(this, repositoriesList);
    }

    async execute(request: CreateSchedulingRequest) {

        const client = Maybe.of(await this.clientRepository.findById(request.clientId));

        if (client.isEmpty()) {
            throw new Error("Client not found")
        }

        const barber = Maybe.of(await this.barberRepository.findById(request.barberId));

        if (barber.isEmpty()) {
            throw new Error("Barber not found")
        }

        const serviceType = Maybe.of(await this.serviceTypeRepository.findById(request.serviceTypeId));

        if (serviceType.isEmpty()) {
            throw new Error("Service type not found")
        }

        return this.schedulingRepository.save({
            ...request,
            scheduleDate: DateTime.of(request.scheduleDate),
            createdAt: DateTime.of(new Date().toUTCString()),
        });
    }
}