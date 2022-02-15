import { Entity } from "./Entity";

type SchedulingProps = {
    cliendId: string;
    barberId: string;
    scheduleDate: Date;
    createdAt: Date;
    serviceType: string,
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
