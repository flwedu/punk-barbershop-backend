import { Entity } from "../../application/domain/entities/Entity";

export default abstract class IRepository<T extends Entity>{

    abstract find(query: any): Promise<T[]>
    abstract findById(id: string): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract save(entity: T, id: string): Promise<string>;
    abstract update(entity: T, id: string): Promise<string>;
    abstract delete(id: string): Promise<any>;
}