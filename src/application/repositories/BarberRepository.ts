import { Barber } from "../../domain/entities/barber";

export interface BarberRepository {

    findById(id: string): Promise<Barber | null>;
}