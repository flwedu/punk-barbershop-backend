import { Props } from "../../domain/entities/Entity";

export default interface Repository<T>{

    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    save(props: Props<T>, id?: string): Promise<T>;

}