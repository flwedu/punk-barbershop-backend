import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { Barber } from "../../domain/entities/barber";
import { Client } from "../../domain/entities/client";
import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceType } from "../../domain/entities/serviceType";
import { CreateSchedulingUseCase } from "./create-scheduling";

describe("create scheduling use case", () => {

    const client = Client.create({
        name: "Test",
        email: "user@email.com",
        birthDate: "01/01/2021",
        cpf: "00000000000"
    });
    const barber = Barber.create({
        name: "Test",
        email: "barber@email.com",
        birthDate: "1980-01-05",
        cpf: "00000000000"
    });

    const serviceType = ServiceType.create({
        name: "Corte xavoso",
        description: "Aquele corte maneiro",
        duration: "60",
        price: "50.00"
    });

    async function setup() {

        const clientRepository = new IMRepository<Client>();
        const barberRepository = new IMRepository<Barber>();
        const serviceTypeRepository = new IMRepository<ServiceType>();
        const schedulingRepository = new IMRepository<Scheduling>();
        const sut = new CreateSchedulingUseCase({
            schedulingRepository, clientRepository, serviceTypeRepository, barberRepository
        });
        clientRepository.list.push(client);
        barberRepository.list.push(barber);
        serviceTypeRepository.list.push(serviceType);

        return { sut, schedulingRepository };
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new scheduling", async () => {

        expect.assertions(3);

        const { sut, schedulingRepository } = await setup();
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

    it.each([{
        cliendId: "",
        barberId: barber.id,
        serviceTypeId: serviceType.id
    }, {
        cliendId: client.id,
        barberId: "",
        serviceTypeId: serviceType.id
    }, {
        cliendId: client.id,
        barberId: barber.id,
        serviceTypeId: ""
    }])("should not create a new scheduling without other entities id", async (props) => {

        expect.assertions(3);

        const { sut, schedulingRepository } = await setup();
        const spy = jest.spyOn(schedulingRepository, "save");

        try {
            //@ts-ignore
            await sut.execute({
                ...props,
                scheduleDate: "2022-01-01T14:00"
            })
        } catch (err) {
            expect(err.message).toEqual(expect.stringMatching(/Invalid\s\w+Id/));
            expect(schedulingRepository.list.length).toEqual(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }
    });

    it.each([undefined, null, "", "2022-01-01T25:10:00"])("should not create a new scheduling with an invalid date -> %s", async (date) => {

        expect.assertions(3);

        const { sut, schedulingRepository } = await setup();
        const spy = jest.spyOn(schedulingRepository, "save");

        try {
            await sut.execute({
                clientId: client.id,
                barberId: barber.id,
                serviceTypeId: serviceType.id,
                scheduleDate: date
            })
        } catch (err) {
            expect(spy).toHaveBeenCalledTimes(0);
            expect(err.message).toEqual(expect.stringMatching(/Invalid\s\w*date/i));
            expect(schedulingRepository.list.length).toEqual(0);
        }
    });
})