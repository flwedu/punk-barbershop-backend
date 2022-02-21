import { Entity, Props } from "../../../domain/entities/Entity";
import IRepository from "../IRepository";

export abstract class IMRepository<T extends Entity> implements IRepository<T> {
    list: T[] = [];

    findById(id: string): Promise<T> {
        const result = this.list.filter((elem) => elem.id === id)[0];

        if (!result) return Promise.reject("element not found");
        return Promise.resolve(result);
    }
    findAll(): Promise<T[]> {
        return Promise.resolve(this.list);
    }
    abstract save(props: Props<T>, id?: string): Promise<T>;

    find(query: any): Promise<T[]> {
        const keys = Object.keys(query.props);

        const result = this.list.filter(
            element => {
                for (let key in keys) {
                    return element.props[key] === query.props[key];
                }
            }
        )
        return Promise.resolve(result);
    }
}
