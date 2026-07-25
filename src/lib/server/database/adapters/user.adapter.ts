import { IUser, UserModel } from '../schemas/user.schema';

export class UserMongoAdapter {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email, isDeleted: false }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
