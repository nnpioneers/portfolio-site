import { IUserRepository } from '../repositories';
import { DBUser } from '../models';

export class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async getUserById(id: string): Promise<DBUser | null> {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string): Promise<DBUser | null> {
    return this.repository.findByEmail(email);
  }

  async createUser(data: Omit<DBUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<DBUser> {
    // Here we would run validators
    return this.repository.create(data);
  }

  async updateUser(id: string, data: Partial<DBUser>): Promise<DBUser> {
    return this.repository.update(id, data);
  }
}
