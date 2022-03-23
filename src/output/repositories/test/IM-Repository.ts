import { Entity } from "../../../application/domain/entities/Entity";
import BusinessRuleError from "../../../application/domain/errors/business-rule-error";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import ResourceNotFound from "../../../application/domain/errors/resource-not-found";
import IRepository from "../IRepository";

export class IMRepository<T extends Entity> implements IRepository<T> {
    list: T[] = [];

    findById(id: string): Promise<T> {
        const index = this.list.findIndex(elem => elem.id == id);
        if (index == -1) {
            throw new ResourceNotFound(ErrorMessage.ID_NOT_FOUND(id));
        }
        return Promise.resolve(this.list[index]);
    }
    findAll(): Promise<T[]> {
        return Promise.resolve(this.list);
    }
    save(entity: T, id?: string): Promise<string> {

        if (this.list.some(el => el.id == id)) {
            throw new BusinessRuleError(ErrorMessage.ID_ALREADY_EXISTS(id));
        }

        this.list.push(entity);
        const lastIndex = this.list.length - 1;
        return Promise.resolve(this.list[lastIndex].id);
    };
    update(entity: T, id: string): Promise<string> {
        const index = this.list.findIndex(element => element.id == id);
        if (index == -1) {
            throw new ResourceNotFound(ErrorMessage.ID_NOT_FOUND(id));
        }
        this.list[index] = entity;
        return Promise.resolve(this.list[index].id);
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
    delete(id: string): Promise<void> {

        const index = this.list.findIndex(elem => elem.id == id);
        if (index == -1) {
            throw new ResourceNotFound(ErrorMessage.ID_NOT_FOUND(id));
        }

        const oldLength = this.list.length;
        this.list.splice(index, 1);

        if (oldLength > this.list.length) {
            return Promise.resolve();
        }
        throw new Error("Server error: could'nt delete the element")
    }
}
