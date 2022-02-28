import { Barber } from "../../domain/entities/barber";
import { Client } from "../../domain/entities/client";
import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceType } from "../../domain/entities/serviceType";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { CreateBarberUseCase } from "../barber/create-barber";
import { CreateClientUseCase } from "../client/create-client";
import { CreateServiceTypeUseCase } from "../service-type/create-serviceType";
import { CreateSchedulingUseCase } from "./create-scheduling";

describe("create scheduling use case", () => {

    async function setup() {

        const clientRepository = new IMRepository<Client>();
        const barberRepository = new IMRepository<Barber>();
        const serviceTypeRepository = new IMRepository<ServiceType>();
        const schedulingRepository = new IMRepository<Scheduling>();
        const sut = new CreateSchedulingUseCase({
            schedulingRepository, clientRepository, serviceTypeRepository, barberRepository
        });

        const client = await new CreateClientUseCase(clientRepository).execute({
            name: "Test",
            email: "user@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        });
        const barber = await new CreateBarberUseCase(barberRepository).execute({
            name: "Test",
            email: "barber@email.com",
            birthDate: "1980-01-05",
            cpf: "00000000000"
        });

        const serviceType = await new CreateServiceTypeUseCase(serviceTypeRepository).execute({
            name: "Corte xavoso",
            description: "Aquele corte maneiro",
            duration: "60",
            price: "50.00"
        });

        return { sut, schedulingRepository, client, serviceType, barber };

    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new scheduling", async () => {

        expect.assertions(3);

        const { sut, schedulingRepository, client, serviceType, barber } = await setup();
        const spy = jest.spyOn(schedulingRepository, "save");

        const result = await sut.execute({
            clientId: client.id,
            barberId: barber.id,
            serviceTypeId: serviceType.id,
            scheduleDate: "2022-01-01T14:00"
        });

        expect(result).toBeTruthy();
        expect(schedulingRepository.list.length).toEqual(1);
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it("should not create a new scheduling without client id", async () => {

        expect.assertions(2);

        const { sut, schedulingRepository, serviceType, barber } = await setup();
        const spy = jest.spyOn(schedulingRepository, "save");

        try {
            await sut.execute({
                clientId: "",
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: "2022-01-01T14:00"
            })
        } catch {

            expect(schedulingRepository.list.length).toEqual(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }
    });

    it("should not create a new scheduling with invalid date", async () => {

        expect.assertions(4);

        const { sut, schedulingRepository, client, serviceType, barber } = await setup();
        const spy = jest.spyOn(schedulingRepository, "save");

        try {
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: "2022-01-01T25:00:00"
            })
        } catch {
            expect(spy).toHaveBeenCalledTimes(0);
        }
        try {
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: ""
            })
        } catch {
            expect(spy).toHaveBeenCalledTimes(0);
        }
        try {
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: "abc"
            })
        } catch {
            expect(spy).toHaveBeenCalledTimes(0);
        }
        expect(schedulingRepository.list.length).toEqual(0);
    });
})