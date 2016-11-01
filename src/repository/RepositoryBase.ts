import {Service} from "typedi";
import {Model, Document, Types} from "mongoose";
@Service()
export class RepositoryBase<T extends Document> {

    private _model: Model<Document>;

    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    }

    save(item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model
                .create(item)
                .onResolve((err: any, result: T) => {
                    err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    }

    findAll(): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this._model
                .find({})
                .lean()
                .exec()
                .onResolve((err: any, result: T[]) => {
                    err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)))
                });
        })
    }

    update(_id: Types.ObjectId, item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model
                .update({_id: _id}, item)
                .lean()
                .exec()
                .onResolve((err: any, result: T) => {
                    err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)));
                });
        })

    }

    remove(_id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model
                .remove({_id: this.toObjectId(_id)})
                .lean()
                .exec()
                .onResolve((err: any, result: T) => {
                    err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    }

    findOne(_id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            return this._model
                .findById(_id)
                .lean()
                .exec()
                .onResolve((err: any, result: T) => {
                    err ? reject(err) : resolve(JSON.parse(JSON.stringify(result)));
                });
        })
    }

    private toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id)
    }

}