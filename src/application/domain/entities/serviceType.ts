import BusinessRuleError from "../errors/business-rule-error";
import { ErrorMessage } from "../errors/error-messages";
import { Duration } from "../valueObjects/Duration";
import { Entity } from "./Entity";

export type InputServiceTypeProps = {
    name: string,
    description: string,
    duration: string,
    price: string,
}

export interface Props<ServiceType> {
    name: string,
    description: string,
    duration: Duration,
    price: number,
}

export class ServiceType extends Entity {
    private constructor(props: Props<ServiceType>, id?: string) {
        super(props, id);
    }

    public static create(props: InputServiceTypeProps, id?: string) {

        // Check values
        if (!props.name || !/\w{2,25}/.test(props.name)) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("name"))
        }

        const duration = Duration.of(props.duration);

        const price = Number(props.price);
        if (price < 1 || Number.isNaN(price)) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("price"));
        }

        const readyProps = {
            ...props,
            duration,
            price
        } as Props<ServiceType>

        const serviceType = new ServiceType(readyProps, id);

        return serviceType;
    }
}
