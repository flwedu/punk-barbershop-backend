import { ServiceType, Props } from "../../../domain/entities/serviceType";
import { IMRepository } from "./IM-Abstract-Repository";

export class IMServiceTypeRepository extends  IMRepository<ServiceType> {
  save(props: Props<ServiceType>, id?: string): Promise<ServiceType> {
    const result = ServiceType.create(props, id);

    this.list.push(result)

    return Promise.resolve(result);
  }
  
}
