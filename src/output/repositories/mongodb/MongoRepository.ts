import { Entity } from "../../../application/domain/entities/Entity";
import ResourceNotFound from "../../../application/domain/errors/resource-not-found";
import { IEntityMongoDbAdapter } from "../../adapters/mongodb/IEntityMongoDbAdapter";
import IRepository from "../IRepository";

export class MongoRepository<T extends Entity> implements IRepository<T> {

    constructor(private readonly adapter: IEntityMongoDbAdapter<T>) {
    }

    async find(queryData: any): Promise<T[]> {
        const model = this.adapter.getModel();
        const query = await model.find(queryData);
        return Promise.resolve(query.map(this.adapter.toEntity));
    }
    async findById(id: string): Promise<T> {
        const model = this.adapter.getModel();
        const query = await model.findOne({ id });
        if (!query) {
            throw new ResourceNotFound();
        }
        const result = this.adapter.toEntity(query);
        return Promise.resolve(result);
    }
    async findAll(): Promise<T[]> {
        const model = this.adapter.getModel();
        const query = await model.find();
        const list = query.map(this.adapter.toEntity);
        return Promise.resolve(list);
    }

    async save(entity: T, id: string): Promise<any> {

        const instance = this.adapter.toDbModel(entity, id);

        try {
            await instance.save();
            return Promise.resolve(instance.id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async update(entity: T, id: string): Promise<string> {

        const model = this.adapter.getModel();
        const query = await model.updateOne({ id }, { ...entity });

        if (query.matchedCount) {
            return Promise.resolve(query.upsertedId.toString());
        }
        else {
            throw new Error("Error updating client")
        }
    }
    async delete(id: string): Promise<any> {
        const model = this.adapter.getModel();
        model.findByIdAndDelete(id, { limit: 1 }, (err, doc, res) => {
            if (err) {
                throw new Error(err.stack);
            }
            return Promise.resolve();
        });

    }
}