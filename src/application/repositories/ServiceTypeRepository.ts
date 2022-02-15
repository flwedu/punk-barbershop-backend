import { ServiceType } from "../../domain/entities/serviceType";

export interface ServiceTypeRepository {

    findById(id: string): Promise<ServiceType | null>;
}