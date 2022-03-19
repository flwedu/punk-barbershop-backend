import { parseDateValue } from "../../../util/parser";
import BusinessRuleError from "../errors/business-rule-error";
import { ErrorMessage } from "../errors/error-messages";
import { Entity, Props } from "./Entity";

export type InputSchedulingRequestProps = {
    clientId: string,
    barberId: string,
    scheduleDate: string,
    serviceTypeId: string,
}

export interface SchedulingProps extends Props<Scheduling> {
    clientId: string,
    barberId: string,
    serviceTypeId: string,
    scheduleDate: Date,
    createdAt: Date,
}

export class Scheduling extends Entity {
    private constructor(props: SchedulingProps, id?: string) {
        super(props, id);
    }

    public static create(props: InputSchedulingRequestProps, id?: string) {

        const scheduleDate = parseDateValue(props.scheduleDate);
        const createdAt = new Date();

        if (scheduleDate < createdAt) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("date", "The date can not be in the past"))
        }

        const readyProps = {
            ...props,
            scheduleDate,
            createdAt
        };

        const scheduling = new Scheduling(readyProps, id);

        return scheduling;
    }
}
