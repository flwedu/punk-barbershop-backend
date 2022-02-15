import { Scheduling } from "../../domain/entities/scheduling";

export interface SchedulingRepository {

    findById(id: string): Promise<Scheduling | null>;
}