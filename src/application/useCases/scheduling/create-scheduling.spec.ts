import { IMBarberRepository } from "../../../output/repositories/test/IM-BaberRepository";
import { IMClientRepository } from "../../../output/repositories/test/IM-ClientRepository"
import { IMSchedulingRepository } from "../../../output/repositories/test/IM-SchedulingRepository";
import { IMServiceTypeRepository } from "../../../output/repositories/test/IM-ServiceTypeRepository";
import { CreateBarber } from "../barber/create-barber";
import { CreateClient } from "../client/create-client";
import { CreateServiceType } from "../service-type/create-serviceType";
import { CreateScheduling } from "./create-scheduling";

describe("create scheduling use case", () => {

    async function prepare() {

        const clientRepository = new IMClientRepository();
        const barberRepository = new IMBarberRepository();
        const serviceTypeRepository = new IMServiceTypeRepository();
        const schedulingRepository = new IMSchedulingRepository();
        const sut = new CreateScheduling({
            schedulingRepository, clientRepository, serviceTypeRepository, barberRepository
        });

        const client = await new CreateClient(clientRepository).execute({
            name: "Test",
            email: "user@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000"
        });
        const barber = await new CreateBarber(barberRepository).execute({
            name: "Test",
            email: "barber@email.com",
            birthDate: "1980-01-05",
            cpf: "00000000000"
        });

        const serviceType = await new CreateServiceType(serviceTypeRepository).execute({
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

        const { sut, schedulingRepository, client, serviceType, barber } = await prepare();
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

        const { sut, schedulingRepository, serviceType, barber } = await prepare();
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

        expect.assertions(2);

        const { sut, schedulingRepository, client, serviceType, barber } = await prepare();
        const spy = jest.spyOn(schedulingRepository, "save");

        try {
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: "202201-01T14:00"
            })
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: ""
            })
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: "abc"
            })
        } catch {

            expect(schedulingRepository.list.length).toEqual(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }
    });
})