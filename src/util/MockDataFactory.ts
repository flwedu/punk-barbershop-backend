import faker from "@faker-js/faker";
import { Barber, Client, Scheduling, ServiceType } from "../application/domain/entities";

export function createFakeClient(id?: string) {

    return Client.create({
        name: faker.name.findName(),
        cpf: "00011122244",
        birthDate: faker.date.past(20).toISOString(),
        email: faker.internet.email(),
    }, id)
}

export function createFakeBarber(id?: string) {

    return Barber.create({
        name: faker.name.findName(),
        cpf: "00011122244",
        birthDate: faker.date.past(20).toISOString(),
        email: faker.internet.email(),
    }, id)
}

export function createFakeServiceType(id?: string) {
    return ServiceType.create({
        name: "Nice test haircut",
        description: faker.lorem.words(50),
        duration: "60",
        price: faker.commerce.price(50, 200)
    }, id);
}

export function createFakeScheduling(data?: { id?: string, clientId?: string, barberId?: string, serviceId?: string }) {
    return Scheduling.create({
        scheduleDate: faker.date.soon(1).toISOString(),
        barberId: data.barberId || "1",
        clientId: data.clientId || "1",
        serviceTypeId: data.serviceId || "1"
    }, data.id)
}