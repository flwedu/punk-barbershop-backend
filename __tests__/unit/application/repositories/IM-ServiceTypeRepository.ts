import { ServiceTypeRepository } from "../../../../src/application/repositories/ServiceTypeRepository";
import { ServiceType, ServiceTypeProps } from "../../../../src/domain/entities/serviceType";

export class IMServiceTypeRepository implements ServiceTypeRepository {
  public list: ServiceType[] = [];

  async findById(id: string): Promise<ServiceType> {
    const serviceType = this.list.filter((serviceType) => serviceType.id === id)[0];

    if(!serviceType){
        return Promise.reject("service type not found")
    }
    return Promise.resolve(serviceType);
  }
  save(props: ServiceTypeProps): Promise<ServiceType> {
    
    const serviceType = ServiceType.create(props);
    this.list.push(serviceType);

    return Promise.resolve(serviceType);
  }
}
