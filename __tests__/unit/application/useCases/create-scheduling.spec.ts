import { CreateScheduling } from "../../../../src/application/useCases/create-scheduling";
import { IMClientRepository } from "../repositories/IM-ClientRepository";
import { IMBarberRepository } from "../repositories/IM-BaberRepository";
import { IMServiceTypeRepository } from "../repositories/IM-ServiceTypeRepository";
import { Client } from "../../../../src/domain/entities/client";
import { Barber } from "../../../../src/domain/entities/barber";
import { ServiceType } from "../../../../src/domain/entities/serviceType";
import { Duration } from "../../../../src/domain/valueObjects/duration";

describe("create-scheduling use case", () => {

    // Creating fake repositories
    const clientRepository = new IMClientRepository();
    const barberRepository = new IMBarberRepository();
    const serviceTypeRepository = new IMServiceTypeRepository();

    // Adding data to fake repositories
    const client = Client.create({
        name: "Test",
        birthDate: new Date(),
        cpf: "00000000",
        email: "",
        createdAt: new Date()
    })
    clientRepository.clientList.push(client)

    const barber = Barber.create({
        name: "Barber",
        birthDate: new Date(),
        cpf: "00000000",
        createdAt: new Date(),
        email: "",
    })
    barberRepository.BarberList.push(barber);

    const serviceType = ServiceType.create({
        name: "Corte na régua",
        description: "Corte xavoso",
        duration: Duration.set(60),
        price: 50.00
    })
    serviceTypeRepository.ServiceTypeList.push(serviceType);

    it("should execute the create-scheduling with the correct parameters", async () => {

        const createScheduling = new CreateScheduling(clientRepository, barberRepository, serviceTypeRepository);

        const scheduling = await createScheduling.execute({
            clientId: client.id,
            barberId: barber.id,
            serviceTypeId: serviceType.id,
            scheduleDate: new Date()
        })

        expect(scheduling).toBeTruthy();
    })
})