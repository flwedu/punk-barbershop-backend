import { Barber } from "../../../domain/entities/barber";
import { Client } from "../../../domain/entities/client";
import { Scheduling } from "../../../domain/entities/scheduling";
import { ServiceType } from "../../../domain/entities/serviceType";
import DateTime from "../../../domain/valueObjects/DateTime";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";

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

export class CreateSchedulingUseCase implements IUseCase {

    private clientRepository: IRepository<Client>
    private barberRepository: IRepository<Barber>
    private serviceTypeRepository: IRepository<ServiceType>
    private schedulingRepository: IRepository<Scheduling>

    constructor(repositoriesList: SchedulingRepositoriesDependencies) {
        Object.assign(this, repositoriesList);
    }

    async execute(request: CreateSchedulingRequest) {

        await this.clientRepository.findById(request.clientId);
        await this.barberRepository.findById(request.barberId);
        await this.serviceTypeRepository.findById(request.serviceTypeId);

        return this.schedulingRepository.save({
            ...request,
            scheduleDate: DateTime.of(request.scheduleDate),
            createdAt: DateTime.of(new Date().toUTCString()),
        });
    }
}