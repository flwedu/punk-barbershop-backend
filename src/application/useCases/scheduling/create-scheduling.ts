import { Barber } from "../../domain/entities/barber";
import { Client } from "../../domain/entities/client";
import { InputSchedulingProps, Scheduling } from "../../domain/entities/scheduling";
import { ServiceType } from "../../domain/entities/serviceType";
import IRepository from "../../../output/repositories/IRepository";
import IUseCase from "../IUseCase";
import BusinessRuleError from "../../../application/domain/errors/business-rule-error";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";

type SchedulingRepositoriesDependencies = {
    clientRepository: IRepository<Client>,
    barberRepository: IRepository<Barber>,
    serviceTypeRepository: IRepository<ServiceType>,
    schedulingRepository: IRepository<Scheduling>
}

type CreateSchedulingRequest = {
    id?: string,
    props: InputSchedulingProps
}

export class CreateSchedulingUseCase implements IUseCase {

    private clientRepository: IRepository<Client>
    private barberRepository: IRepository<Barber>
    private serviceTypeRepository: IRepository<ServiceType>
    private schedulingRepository: IRepository<Scheduling>

    constructor(repositoriesList: SchedulingRepositoriesDependencies) {
        Object.assign(this, repositoriesList);
    }

    async execute(data: CreateSchedulingRequest) {

        const keys = Object.keys(data);
        for (let key in keys) {
            if (!data[keys[key]]) {
                throw new BusinessRuleError(ErrorMessage.INVALID_PARAM(keys[key]));
            }
        }

        await this.clientRepository.findById(data.props.clientId);
        await this.barberRepository.findById(data.props.barberId);
        await this.serviceTypeRepository.findById(data.props.serviceTypeId);

        const scheduling = Scheduling.create(data.props, data.id);
        return this.schedulingRepository.save(scheduling, scheduling.id);
    }
}