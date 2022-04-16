import BusinessRuleError from "../errors/business-rule-error";
import { PriceValidator } from "../validators/PriceValidator";
import { TextValidator } from "../validators/TextValidator";
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

        const errors = [];
        errors.push(...new PriceValidator({}).checkValues({ price: props.price }));
        errors.push(...new TextValidator({}).checkValues({ name: props.name, description: props.description }));
        if (errors.length) throw new BusinessRuleError(`${[...errors]}`)

        const duration = Duration.of(props.duration);

        const serviceType = new ServiceType({
            ...props,
            duration,
        }, id);

        return serviceType;
    }
}
