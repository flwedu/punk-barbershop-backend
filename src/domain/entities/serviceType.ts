import { Duration } from "../valueObjects/Duration";
import { Entity, Props } from "./Entity";

export interface ServiceTypeProps extends Props<ServiceType> {
    name: string,
    description: string,
    duration: Duration,
    price: number,
}

export class ServiceType extends Entity {
    private constructor(props: ServiceTypeProps, id?: string) {
        super(props, id);
    }

    public static create(props: ServiceTypeProps, id?: string) {
        const serviceType = new ServiceType(props, id);

        return serviceType;
    }
}
