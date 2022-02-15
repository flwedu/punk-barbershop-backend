import { ServiceTypeRepository } from "../../../../src/application/repositories/ServiceTypeRepository";
import { ServiceType } from "../../../../src/domain/entities/serviceType";

export class IMServiceTypeRepository implements ServiceTypeRepository {

    public ServiceTypeList: ServiceType[] = [];

    async findById(id: string): Promise<ServiceType> {

        const serviceType = this.ServiceTypeList.filter(serviceType => serviceType.id === id)[0]

        return serviceType
    }

}