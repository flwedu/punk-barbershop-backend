import { testPriceValue } from "../../../util/testFields";
import BusinessRuleError from "../errors/business-rule-error";
import { ErrorMessage } from "../errors/error-messages";
import { Duration } from "../valueObjects/Duration";
import { Entity, Props } from "./Entity";

export type InputServiceTypeProps = {
    name: string,
    description: string,
    duration: string,
    price: string,
}

export interface ServiceTypeProps extends Props<ServiceType> {
    name: string,
    description: string,
    duration: Duration,
    price: string,
}

export class ServiceType extends Entity {
    private constructor(props: ServiceTypeProps, id?: string) {
        super(props, id);
    }

    public static create(props: InputServiceTypeProps, id?: string) {

        // Check values
        if (!props.name || !/\w+/.test(props.name)) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("name"))
        }

        const duration = Duration.of(props.duration);

        if (!testPriceValue(props.price)) {
            throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("price"));
        }

        const serviceType = new ServiceType({
            ...props,
            duration,
        }, id);

        return serviceType;
    }
}
