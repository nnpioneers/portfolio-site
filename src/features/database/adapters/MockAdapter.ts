import { IUserRepository } from '../repositories';
import { DBUser } from '../models';

/**
 * MockAdapter used for Phase 2.2 local testing without a real database.
 */
export class MockUserRepository implements IUserRepository {
  private users: DBUser[] = [];

  async findById(id: string): Promise<DBUser | null> {
    return this.users.find(u => u._id === id) || null;
  }

  async findAll(): Promise<DBUser[]> {
    return this.users;
  }

  async create(data: Omit<DBUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<DBUser> {
    const newUser: DBUser = {
      ...data,
      _id: 'mock_id_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, data: Partial<DBUser>): Promise<DBUser> {
    const index = this.users.findIndex(u => u._id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u._id !== id);
    return this.users.length < initialLength;
  }

  async findByEmail(email: string): Promise<DBUser | null> {
    return this.users.find(u => u.email === email) || null;
  }
}
