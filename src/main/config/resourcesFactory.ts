import { Barber } from "../../application/domain/entities/barber";
import { Client } from "../../application/domain/entities/client";
import { Scheduling } from "../../application/domain/entities/scheduling";
import { ServiceType } from "../../application/domain/entities/serviceType";
import { IMRepository } from "../../output/repositories/test/IM-Repository";

export const clientRepository = new IMRepository<Client>();
export const barberRepository = new IMRepository<Barber>();
export const schedulingRepository = new IMRepository<Scheduling>();
export const serviceTypeRepository = new IMRepository<ServiceType>();