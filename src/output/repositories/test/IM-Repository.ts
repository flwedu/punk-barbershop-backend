import { Entity } from "../../../application/domain/entities/Entity";
import ResourceNotFound from "../../../application/domain/errors/resource-not-found";
import IRepository from "../IRepository";

export class IMRepository<T extends Entity> implements IRepository<T> {
    list: T[] = [];

    findById(id: string): Promise<T> {
        const index = this.list.findIndex(elem => elem.id == id);
        if (index == -1) {
            throw new ResourceNotFound("element not found");
        }
        return Promise.resolve(this.list[index]);
    }
    findAll(): Promise<T[]> {
        return Promise.resolve(this.list);
    }
    save(entity: T, id?: string): Promise<T> {
        this.list.push(entity);
        const lastIndex = this.list.length - 1;
        return Promise.resolve(this.list[lastIndex]);
    };
    update(entity: T, id: string): Promise<T> {
        const index = this.list.findIndex(element => element.id == id);
        if (index == -1) {
            throw new ResourceNotFound("element not found");
        }
        this.list[index] = entity;
        return Promise.resolve(this.list[index]);
    };

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
    delete(id: string): Promise<any> {
        const oldLength = this.list.length;
        this.list = this.list.filter(element => element.id != id);

        if (oldLength > this.list.length) {
            return Promise.resolve(this.list);
        }
        return Promise.reject()
    }
}
