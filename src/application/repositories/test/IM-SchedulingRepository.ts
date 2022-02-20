import { Props, Scheduling } from "../../../domain/entities/scheduling";
import { IMRepository } from "./IM-Abstract-Repository";

export class IMSchedulingRepository extends IMRepository<Scheduling> {
    save(props: Props<Scheduling>, id?: string): Promise<Scheduling> {
        const result = Scheduling.create(props, id);

        this.list.push(result)

        return Promise.resolve(result);
    }

}
