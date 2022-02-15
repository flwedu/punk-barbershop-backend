import { Entity } from "./Entity";
import { ServiceType } from "./serviceType";

type SchedulingProps = {
    clientId: string;
    barberId: string;
    serviceTypeId: string;
    scheduleDate: Date;
    createdAt: Date;
};

export class Scheduling extends Entity<SchedulingProps> {
    private constructor(props: SchedulingProps, id?: string) {
        super(props, id);
    }

    public static create(props: SchedulingProps, id?: string) {
        const scheduling = new Scheduling(props, id);

        return scheduling;
    }
}
