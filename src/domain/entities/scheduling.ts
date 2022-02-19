import { Entity } from "./Entity";

export interface Props<Scheduling> {
    clientId: string,
    barberId: string,
    serviceTypeId: string,
    scheduleDate: Date,
    createdAt: Date,
}

export class Scheduling extends Entity {
    private constructor(props: Props<Scheduling>, id?: string) {
        super(props, id);
    }

    public static create(props: Props<Scheduling>, id?: string) {
        const scheduling = new Scheduling(props, id);

        return scheduling;
    }
}
