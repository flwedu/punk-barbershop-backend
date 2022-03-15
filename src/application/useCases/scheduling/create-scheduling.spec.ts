import faker from "@faker-js/faker";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import {
    createFakeBarber,
    createFakeClient,
    createFakeSchedulingProps,
    createFakeServiceType,
} from "../../../util/MockDataFactory";
import { Barber } from "../../domain/entities/barber";
import { Client } from "../../domain/entities/client";
import { Scheduling } from "../../domain/entities/scheduling";
import { ServiceType } from "../../domain/entities/serviceType";
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
        clientRepository.list.push(client);
        barberRepository.list.push(barber);
        serviceTypeRepository.list.push(serviceType);

        return { sut, schedulingRepository, saveSpy };
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should create a scheduling with valid data", async () => {
        expect.assertions(3);

        const { sut, schedulingRepository, saveSpy } = await setup();

        const scheduling = await sut.execute({
            ...createFakeSchedulingProps({ barberId: barber.id, clientId: client.id, serviceId: serviceType.id }),
        });

        expect(scheduling).toMatchObject({ ...Scheduling });
        expect(await schedulingRepository.findById(scheduling.id)).toMatchObject({
            ...Scheduling,
        });
        expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it.each([
        faker.date.past(1).toISOString(),
        faker.date.recent(1).toISOString(),
    ])(
        "Should throw an error when trying to create a scheduling with a past date",
        async (date) => {
            expect.assertions(3);
            const { sut, schedulingRepository, saveSpy } = await setup();

            try {
                await sut.execute({
                    ...createFakeSchedulingProps({ barberId: barber.id, clientId: client.id, serviceId: serviceType.id }),
                    scheduleDate: date
                });
            } catch (err) {
                expect(err.message).toEqual(
                    ErrorMessage.INVALID_PARAM(
                        "date",
                        "The date can not be in the past"
                    )
                );
                expect(saveSpy).not.toHaveBeenCalled();
                expect(schedulingRepository.list.length).toEqual(0);
            }
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
        "Should throw an error when trying to create a scheduling without the ID of related entities",
        async (props) => {
            expect.assertions(3);

            const { sut, schedulingRepository, saveSpy } = await setup();

            try {
                //@ts-ignore
                await sut.execute({
                    ...props,
                    scheduleDate: "2022-01-01T14:00",
                });
            } catch (err) {
                expect(err.message).toEqual(
                    expect.stringMatching(/Invalid\s\w+Id/)
                );
                expect(schedulingRepository.list.length).toEqual(0);
                expect(saveSpy).toHaveBeenCalledTimes(0);
            }
        }
    );

    it.each([undefined, null, "", "2022-01-01T25:10:00"])(
        "Should throw an error when trying to create a scheduling with this invalid date: %s",
        async (date) => {
            expect.assertions(3);

            const { sut, schedulingRepository, saveSpy } = await setup();

            try {
                await sut.execute({
                    clientId: client.id,
                    barberId: barber.id,
                    serviceTypeId: serviceType.id,
                    scheduleDate: date,
                });
            } catch (err) {
                expect(saveSpy).toHaveBeenCalledTimes(0);
                expect(err.message).toEqual(
                    expect.stringMatching(/Invalid\s\w*date/i)
                );
                expect(schedulingRepository.list.length).toEqual(0);
            }
        }
    );
});
