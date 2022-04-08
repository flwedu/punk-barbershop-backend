import { InputServiceTypeProps, ServiceType } from "../../domain/entities/serviceType";
import IRepository from "../../../output/repositories/IRepository";

type CreateServiceTypeRequest = {
    id?: string,
    props: InputServiceTypeProps
}

export class CreateServiceTypeUseCase {

    constructor(private repository: IRepository<ServiceType>) { }

    async execute(data: CreateServiceTypeRequest) {

        const serviceType = ServiceType.create(data.props, data.id);
        return this.repository.save(serviceType, serviceType.id);
    }

}