import { Entity, Props } from "../../domain/entities/Entity";

export default abstract class IRepository<T extends Entity>{

    abstract find(query: any): Promise<T[]>
    abstract findById(id: string): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract save(props: Props<T>, id?: string): Promise<T>;

}