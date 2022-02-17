import { CreateScheduling } from "../../../../src/application/useCases/create-scheduling";
import { IMClientRepository } from "../repositories/IM-ClientRepository";
import { IMBarberRepository } from "../repositories/IM-BaberRepository";
import { IMServiceTypeRepository } from "../repositories/IM-ServiceTypeRepository";
import { Client } from "../../../../src/domain/entities/client";
import { Barber } from "../../../../src/domain/entities/barber";
import { ServiceType } from "../../../../src/domain/entities/serviceType";
import { Duration } from "../../../../src/domain/valueObjects/duration";
import { Maybe } from "../../../../src/util/Maybe";

describe("create-scheduling use case", () => {

    // Creating fake repositories
    const clientRepository = new IMClientRepository();
    const barberRepository = new IMBarberRepository();
    const serviceTypeRepository = new IMServiceTypeRepository();

    // Adding data to fake repositories
    const client = Client.create({
        name: "Test",
        birthDate: new Date(),
        cpf: "000.111.222-33",
        email: "user@email.com",
        createdAt: new Date(),
    })
    if(client)    clientRepository.clientList.push(client)

    const barber = Barber.create({
        name: "Barber",
        birthDate: new Date(),
        cpf: "000.111.222-33",
        createdAt: new Date(),
        email: "user@email.com",
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

        expect.assertions(1);

        const createScheduling = new CreateScheduling(clientRepository, barberRepository, serviceTypeRepository);

        const maybeOfScheduling = Maybe.of(await createScheduling.execute({
            clientId: client?.id || "1",
            barberId: barber.id,
            serviceTypeId: serviceType.id,
            scheduleDate: new Date()
        }));

        expect(maybeOfScheduling.isPresent()).toBeTruthy();
    })

    it("should throw error when executing the create-scheduling with the correct parameters but with resource not found", () => {

        expect.assertions(1);
        const createScheduling = new CreateScheduling(clientRepository, barberRepository, serviceTypeRepository);

        expect(async () => {
            Maybe.of(await createScheduling.execute({
                clientId: "1",
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: new Date()
            }))
        }).rejects.toThrow()
    }
    )
})

