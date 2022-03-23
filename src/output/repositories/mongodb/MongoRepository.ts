import mongoose from "mongoose";
import { Entity } from "../../../application/domain/entities/Entity";
import ResourceNotFound from "../../../application/domain/errors/resource-not-found";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import IRepository from "../IRepository";

export abstract class MongoRepository<T extends Entity> implements IRepository<T> {

    protected entityClass: any;
    protected modelParser: EntityModelParser;
    protected model: mongoose.Model<any>;
    protected schema: mongoose.Schema;

    constructor(args: {
        entityClass: any,
        modelParser: EntityModelParser,
        model: mongoose.Model<any>,
        schema: mongoose.Schema
    }) {
        Object.assign(this, args);
    }

    async find(queryData: any): Promise<T[]> {
        const query = await this.model.find(queryData);
        return Promise.resolve(query.map(element => this.entityClass.create(element.props, element._id)));
    }
    async findById(id: string): Promise<T> {
        const query = await this.model.findOne({ id });
        if (!query) {
            throw new ResourceNotFound();
        }
        const client = this.entityClass.create(query._doc, query.id);
        return Promise.resolve(client);
    }
    async findAll(): Promise<T[]> {
        const query = await this.model.find();
        const list = query.map(element => this.entityClass.create({ ...element._doc }, element.id))
        return Promise.resolve(list);
    }

    async save(entity: T, id?: string): Promise<any> {

        const model = this.modelParser.toModel(entity);
        const mongooseModel = new this.model({ ...model, id });

        try {
            await mongooseModel.save();
            return Promise.resolve(mongooseModel.id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async update(entity: T, id: string): Promise<string> {

        const model = this.modelParser.toModel(entity);
        delete model.id;
        const query = await this.model.updateOne({ id }, { ...model });

        if (query.matchedCount) {
            return Promise.resolve(query.upsertedId.toString());
        }
        else {
            throw new Error("Error updating client")
        }
    }
    async delete(id: string): Promise<any> {

        this.model.findByIdAndDelete(id, { limit: 1 }, (err, doc, res) => {
            if (err) {
                throw new Error(err.stack);
            }
            return Promise.resolve();
        });

    }
}