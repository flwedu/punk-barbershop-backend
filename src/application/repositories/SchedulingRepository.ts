import { Scheduling, SchedulingProps } from "../../domain/entities/scheduling";

export interface SchedulingRepository {

    findById(id: string): Promise<Scheduling>;

    save(props: SchedulingProps, id?: string): Promise<Scheduling>;
}