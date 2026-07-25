import { IUserRepository, IBusinessRepository } from '../repositories';
import { DBUser, DBBusiness } from '../models';

/**
 * Placeholder for actual MongoDB connection and Mongoose/Native Driver models.
 */
export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<DBUser | null> { throw new Error('Not implemented'); }
  async findAll(): Promise<DBUser[]> { throw new Error('Not implemented'); }
  async create(data: any): Promise<DBUser> { throw new Error('Not implemented'); }
  async update(id: string, data: any): Promise<DBUser> { throw new Error('Not implemented'); }
  async delete(id: string): Promise<boolean> { throw new Error('Not implemented'); }
  async findByEmail(email: string): Promise<DBUser | null> { throw new Error('Not implemented'); }
}

export class MongoBusinessRepository implements IBusinessRepository {
  async findById(id: string): Promise<DBBusiness | null> { throw new Error('Not implemented'); }
  async findAll(): Promise<DBBusiness[]> { throw new Error('Not implemented'); }
  async create(data: any): Promise<DBBusiness> { throw new Error('Not implemented'); }
  async update(id: string, data: any): Promise<DBBusiness> { throw new Error('Not implemented'); }
  async delete(id: string): Promise<boolean> { throw new Error('Not implemented'); }
  async findByOwnerId(ownerId: string): Promise<DBBusiness[]> { throw new Error('Not implemented'); }
}
