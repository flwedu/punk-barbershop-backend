import { SchedulingRepository } from "../../../../src/application/repositories/SchedulingRepository";
import { Scheduling, SchedulingProps } from "../../../../src/domain/entities/scheduling";

export class IMSchedulingRepository implements SchedulingRepository {
  public list: Scheduling[] = [];

  async findById(id: string): Promise<Scheduling> {
    const scheduling = this.list.filter((scheduling) => scheduling.id === id)[0];

    if(!scheduling){
        return Promise.reject("scheduling not found")
    }
    return Promise.resolve(scheduling);
  }
  save(props: SchedulingProps): Promise<Scheduling> {
    
    const scheduling = Scheduling.create(props);
    this.list.push(scheduling);

    return Promise.resolve(scheduling);
  }
}
