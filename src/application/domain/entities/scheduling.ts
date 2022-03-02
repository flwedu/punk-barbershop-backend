import { parseDateValue } from "../../../util/parser";
import { Entity } from "./Entity";

export type InputSchedulingRequestProps = {
    clientId: string,
    barberId: string,
    scheduleDate: string,
    serviceTypeId: string,
}

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

    public static create(props: InputSchedulingRequestProps, id?: string) {

        const readyProps = {
            ...props,
            scheduleDate: parseDateValue(props.scheduleDate),
            createdAt: new Date()
        } as Props<Scheduling>;

        const scheduling = new Scheduling(readyProps, id);

        return scheduling;
    }
}
