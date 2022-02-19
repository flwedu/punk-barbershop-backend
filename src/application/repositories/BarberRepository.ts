import { Barber, BarberProps } from "../../domain/entities/barber";

export interface BarberRepository {

    findById(id: string): Promise<Barber>;

    save(props: BarberProps, id?: string): Promise<Barber>;
}