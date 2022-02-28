import { Barber } from "../../application/domain/entities/barber";
import { Client } from "../../application/domain/entities/client";
import { Scheduling } from "../../application/domain/entities/scheduling";
import { ServiceType } from "../../application/domain/entities/serviceType";
import { IMRepository } from "../../output/repositories/test/IM-Repository";

const clientRepository = new IMRepository<Client>();
const barberRepository = new IMRepository<Barber>();
const schedulingRepository = new IMRepository<Scheduling>();
const serviceTypeRepository = new IMRepository<ServiceType>();

export function getRepository() {

    return { clientRepository, barberRepository, schedulingRepository, serviceTypeRepository };
}