import { BarberRepository } from "../../../../src/application/repositories/BarberRepository";
import { Barber, BarberProps } from "../../../../src/domain/entities/barber";

export class IMBarberRepository implements BarberRepository {
  public barberList: Barber[] = [];

  async findById(id: string): Promise<Barber> {
    const barber = this.barberList.filter((barber) => barber.id === id)[0];

    if(!barber){
        return Promise.reject("barber not found")
    }
    return Promise.resolve(barber);
  }
  save(props: BarberProps): Promise<Barber> {
    
    const barber = Barber.create(props);
    this.barberList.push(barber);

    return Promise.resolve(barber);
  }
}
