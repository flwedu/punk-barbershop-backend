import { Entity } from "../../../application/domain/entities/Entity";
import ResourceNotFound from "../../../application/domain/errors/resource-not-found";
import { IEntityMongoDbAdapter } from "../../adapters/mongodb/IEntityMongoDbAdapter";
import IRepository from "../IRepository";

export class MongoRepository<T extends Entity> implements IRepository<T> {

    constructor(private readonly adapter: IEntityMongoDbAdapter<T>) {
    }

    async find(queryData: any): Promise<T[]> {
        const Model = this.adapter.getModel();
        const query = await Model.find(queryData);
        return Promise.resolve(query.map(this.adapter.toEntity));
    }
    async findById(id: string): Promise<T> {
        const Model = this.adapter.getModel();
        const query = await Model.findOne({ id });
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

        const doc = this.adapter.toDbModel(entity, id);

        try {
            await doc.save();
            return Promise.resolve(doc.id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async update(entity: T, id: string): Promise<string> {

        const Model = this.adapter.getModel();
        const { _id, ...props } = this.adapter.toDbModel(entity, id);
        const query = await Model.updateOne({ _id: id }, { $set: { ...props } });

        if (query.upsertedId) {
            return Promise.resolve(query.upsertedId.toString());
        }
        else {
            throw new Error("Error updating client")
        }
    }
    async delete(id: string): Promise<any> {
        const Model = this.adapter.getModel();
        const result = Model.deleteOne({ id }, err => {
            if (err) return Promise.reject(err);
        })
        return Promise.resolve(`deleted ${result.countDocuments()}`);
    }
}