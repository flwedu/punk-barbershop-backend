import IRepository from "../../../output/repositories/IRepository";
import { InputServiceTypeProps, ServiceType } from "../../domain/entities/serviceType";
import IUseCase from "../IUseCase";

type UpdateServiceTypeRequest = {
    id: string,
    props: InputServiceTypeProps
}

export class UpdateServiceTypeUseCase implements IUseCase {
    constructor(private readonly repository: IRepository<ServiceType>) { };

    async execute(data: UpdateServiceTypeRequest): Promise<ServiceType> {
        const serviceType = ServiceType.create(data.props, data.id);
        return this.repository.update(serviceType, data.id);
    };
}