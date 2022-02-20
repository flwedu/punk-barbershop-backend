import { Duration } from "../valueObjects/Duration";
import { Entity } from "./Entity";

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

    public static create(props: Props<ServiceType>, id?: string) {
        const serviceType = new ServiceType(props, id);

        return serviceType;
    }
}
