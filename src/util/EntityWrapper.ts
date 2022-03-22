import { Barber, Client, InputBarberProps, InputClientProps, InputSchedulingRequestProps, InputServiceTypeProps, Scheduling, ServiceType } from "../application/domain/entities";

export class EntityFactory {
    constructor(private readonly Type: any) { }

    create(props: any, id?: string) {
        const type = this.typeName(this.Type);
        return EntityWrapper[type](props, id);
    }

    private typeName(ctor: { name: string }) {
        return ctor.name;
    }
}

const EntityWrapper = {
    Client: (props: InputClientProps, id?: string) => Client.create(props, id),
    Barber: (props: InputBarberProps, id?: string) => Barber.create(props, id),
    ServiceType: (props: InputServiceTypeProps, id?: string) => ServiceType.create(props, id),
    Scheduling: (props: InputSchedulingRequestProps, id?: string) => Scheduling.create(props, id)
};
