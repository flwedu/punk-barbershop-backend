import faker from "@faker-js/faker";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import {
    createFakeBarber,
    createFakeClient,
    createFakeSchedulingProps,
    createFakeServiceType
} from "../../../__test_utils__/MockDataFactory";
import { Barber } from "../../domain/entities/barber";
import { Client } from "../../domain/entities/client";
import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceType } from "../../domain/entities/serviceType";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import ResourceNotFound from "../../domain/errors/resource-not-found";
import { CreateSchedulingUseCase } from "./create-scheduling";

describe("create scheduling use case", () => {
    const client = createFakeClient();
    const barber = createFakeBarber();
    const serviceType = createFakeServiceType();

    async function setup() {
        const clientRepository = new IMRepository<Client>();
        const barberRepository = new IMRepository<Barber>();
        const serviceTypeRepository = new IMRepository<ServiceType>();
        const schedulingRepository = new IMRepository<Scheduling>();
        const saveSpy = jest.spyOn(schedulingRepository, "save");
        const sut = new CreateSchedulingUseCase({
            schedulingRepository,
            clientRepository,
            serviceTypeRepository,
            barberRepository,
        });
        await clientRepository.save(client);
        await barberRepository.save(barber);
        await serviceTypeRepository.save(serviceType);

        return { sut, schedulingRepository, saveSpy };
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should create a scheduling with valid data", async () => {
        expect.assertions(3);

        const { sut, schedulingRepository, saveSpy } = await setup();

        const schedulingId = await sut.execute({
            props: {
                ...createFakeSchedulingProps({ barberId: barber.id, clientId: client.id, serviceId: serviceType.id }),
            }
        });

        expect(schedulingId).toEqual(expect.any(String));
        expect(await schedulingRepository.findById(schedulingId)).toMatchObject({ ...Scheduling });
        expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    describe("Should throw error: ", () => {

        it.each([
            faker.date.past(1).toISOString(),
            faker.date.recent(1).toISOString(),
            new Date().toISOString()
        ])(
            "When trying to create a scheduling with a past date",
            async (date) => {
                expect.assertions(2);
                const { sut, saveSpy } = await setup();

                expect(sut.execute({
                    props: {
                        ...createFakeSchedulingProps({ barberId: barber.id, clientId: client.id, serviceId: serviceType.id }),
                        scheduleDate: date
                    }
                })).rejects.toThrowError(BusinessRuleError);
                expect(saveSpy).not.toHaveBeenCalled();
            }
        );

        it.each([
            {
                cliendId: "",
                barberId: barber.id,
                serviceTypeId: serviceType.id,
            },
            {
                cliendId: client.id,
                barberId: "",
                serviceTypeId: serviceType.id,
            },
            {
                cliendId: client.id,
                barberId: barber.id,
                serviceTypeId: "",
            },
        ])(
            "When trying to create a scheduling without the ID of related entities",
            async (propsValues: any) => {
                expect.assertions(3);

                const { sut, schedulingRepository, saveSpy } = await setup();

                expect(sut.execute({
                    props: {
                        ...propsValues,
                        scheduleDate: "2022-01-01T14:00",
                    }
                })).rejects.toThrowError(ResourceNotFound);
                expect(schedulingRepository.list.length).toEqual(0);
                expect(saveSpy).toHaveBeenCalledTimes(0);
            }
        );

        it.each([undefined, null, "", "2022-01-01T25:10:00"])(
            "When trying to create a scheduling with this invalid date: %s",
            async (date) => {
                expect.assertions(3);

                const { sut, schedulingRepository, saveSpy } = await setup();

                expect(sut.execute({
                    props: {
                        clientId: client.id,
                        barberId: barber.id,
                        serviceTypeId: serviceType.id,
                        scheduleDate: date,
                    }
                })).rejects.toThrowError(BusinessRuleError);
                expect(saveSpy).not.toHaveBeenCalled();
                expect(schedulingRepository.list.length).toEqual(0);
            }
        );
    })
});
