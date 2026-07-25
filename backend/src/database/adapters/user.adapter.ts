import { BaseMongoAdapter } from './base.adapter';
import { UserModel, IUser } from '../schemas/user.schema';

/**
 * Specific implementation for User Repository
 * Can implement interfaces defined in features/database/repositories/Interfaces.ts
 */
export class UserMongoAdapter extends BaseMongoAdapter<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email, isDeleted: false }).exec();
  }
}
