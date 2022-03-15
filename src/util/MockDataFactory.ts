import faker from "@faker-js/faker";
import {
    Barber,
    Client,
    Scheduling,
    ServiceType,
} from "../application/domain/entities";
import { InputBarberProps } from "../application/domain/entities/barber";
import { InputClientProps } from "../application/domain/entities/client";
import { InputSchedulingRequestProps } from "../application/domain/entities/scheduling";
import { InputServiceTypeProps } from "../application/domain/entities/serviceType";

export function createFakeClientProps(): InputClientProps {
    return {
        name: faker.name.findName(),
        cpf: "00011122244",
        birthDate: faker.date.past(20).toISOString(),
        email: faker.internet.email(),
    };
}
export function createFakeBarberProps(): InputBarberProps {
    return {
        name: faker.name.findName(),
        cpf: "00011122244",
        birthDate: faker.date.past(20).toISOString(),
        email: faker.internet.email(),
    };
}

export function createFakeServiceTypeProps(): InputServiceTypeProps {
    return {
        name: "Nice test haircut",
        description: faker.lorem.words(50),
        duration: "60",
        price: faker.commerce.price(50, 200),
    };
}

export function createFakeSchedulingProps(data: { id?: string; clientId?: string; barberId?: string; serviceId?: string; }): InputSchedulingRequestProps {
    return {
        scheduleDate: faker.date.soon(1).toISOString(),
        barberId: data.barberId || "1",
        clientId: data.clientId || "1",
        serviceTypeId: data.serviceId || "1",
    };
}

export function createFakeClient(id?: string) {
    return Client.create(createFakeClientProps(), id);
}

export function createFakeBarber(id?: string) {
    return Barber.create(createFakeBarberProps(), id);
}

export function createFakeServiceType(id?: string) {
    return ServiceType.create(createFakeServiceTypeProps(), id);
}

export function createFakeScheduling(data?: {
    id?: string;
    clientId?: string;
    barberId?: string;
    serviceId?: string;
}) {
    return Scheduling.create(
        createFakeSchedulingProps(data),
        data.id
    );
}