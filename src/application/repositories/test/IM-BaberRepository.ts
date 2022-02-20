import { Barber, Props } from "../../../domain/entities/barber";
import { IMRepository } from "./IM-Abstract-Repository";

export class IMBarberRepository extends IMRepository<Barber> {

  save(props: Props<Barber>, id?: string): Promise<Barber> {

    const result = Barber.create(props, id);

    this.list.push(result)

    return Promise.resolve(result);
  }

}
