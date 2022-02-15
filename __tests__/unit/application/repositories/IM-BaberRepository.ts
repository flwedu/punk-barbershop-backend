import { BarberRepository } from "../../../../src/application/repositories/BarberRepository";
import { Barber } from "../../../../src/domain/entities/barber";

export class IMBarberRepository implements BarberRepository {

    public BarberList: Barber[] = [];

    async findById(id: string): Promise<Barber> {

        const barber = this.BarberList.filter(barber => barber.id === id)[0];

        return barber
    }

}