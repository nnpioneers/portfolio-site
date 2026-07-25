import { Model, Document } from 'mongoose';

/**
 * Base generic MongoDB adapter that fulfills common CRUD operations.
 */
export class BaseMongoAdapter<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id, isDeleted: false }).exec();
  }

  async findAll(filter: any = {}, skip: number = 0, limit: number = 10): Promise<T[]> {
    return this.model.find({ ...filter, isDeleted: false })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    // Soft delete implementation
    const result = await this.model.updateOne({ _id: id }, { $set: { isDeleted: true } }).exec();
    return result.modifiedCount > 0;
  }
}
