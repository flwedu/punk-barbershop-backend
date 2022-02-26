import { InputServiceTypeProps, ServiceType } from "../../../domain/entities/serviceType";
import IRepository from "../../../output/repositories/IRepository";

export class CreateServiceTypeUseCase {

    constructor(private repository: IRepository<ServiceType>) { }

    async execute(data: InputServiceTypeProps) {

        return await this.repository.save(data);
    }

}