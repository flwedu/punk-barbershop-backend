import { Duration } from "../valueObjects/duration";
import { Entity } from "./Entity";

type ServiceTypeProps = {
    name: string,
    description: string,
    duration: Duration,
    price: number,
};

export class ServiceType extends Entity<ServiceTypeProps> {
    private constructor(props: ServiceTypeProps, id?: string) {
        super(props, id);
    }

    get id(): string { return this.id }

    public static create(props: ServiceTypeProps, id?: string) {
        const serviceType = new ServiceType(props, id);

        return serviceType;
    }
}
