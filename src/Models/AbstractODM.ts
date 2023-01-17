import { Schema, Model, model, models, UpdateQuery } from 'mongoose';

export default class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(record: T): Promise<T> {
    return this.model.create({ ...record });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  public async update(id: string, newUpdateInfo: T): Promise<T | null> {
    await this.model.updateOne({ _id: id }, { ...newUpdateInfo } as UpdateQuery<T>);
    return { id, ...newUpdateInfo };
  }
}
