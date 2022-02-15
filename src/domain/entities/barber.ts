import { Entity } from "./Entity";

type BarberProps = {
    name: string;
    email: string;
    createdAt: Date;
    birthDate: Date;
    cpf: string;
    cnpj?: string;
};

export class Barber extends Entity<BarberProps> {
    private constructor(props: BarberProps, id?: string) {
        super(props, id);
    }

    public static create(props: BarberProps, id?: string) {
        const barber = new Barber(props, id);

        return barber;
    }
}
