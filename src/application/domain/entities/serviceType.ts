import BusinessRuleError from "../errors/business-rule-error";
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
        if (props.name.length < 2 || props.name.length > 25) {
            throw new BusinessRuleError("Service name must contain more than 2 characters and no more than 25 characters")
        }
        if (props.name.length < 2 || props.name.length > 50) {
            throw new BusinessRuleError("Service desciption must contain more than 2 characters and less than 50 characters")
        }

        if (props.price.length < 1 || !/^\d+[\.\,]?\d{0,2}$/.test(props.price.replace(",", ""))) {
            throw new BusinessRuleError("invalid service price value")
        }

        const duration = Duration.of(props.duration);
        const price = Number(props.price);
        if (price < 1 || Number.isNaN(price)) {
            throw new BusinessRuleError("Invalid price value");
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
