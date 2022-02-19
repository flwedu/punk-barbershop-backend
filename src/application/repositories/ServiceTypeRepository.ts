import { ServiceType, ServiceTypeProps } from "../../domain/entities/serviceType";

export interface ServiceTypeRepository {

    findById(id: string): Promise<ServiceType>;

    save(props: ServiceTypeProps, id?: string): Promise<ServiceType>;
}