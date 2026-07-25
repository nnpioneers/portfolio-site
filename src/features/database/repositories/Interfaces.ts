import { DBUser, DBBusiness, DBProject, DBBusinessPlan } from '../models';

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface IUserRepository extends IBaseRepository<DBUser> {
  findByEmail(email: string): Promise<DBUser | null>;
}

export interface IBusinessRepository extends IBaseRepository<DBBusiness> {
  findByOwnerId(ownerId: string): Promise<DBBusiness[]>;
}

export interface IProjectRepository extends IBaseRepository<DBProject> {
  findByBusinessId(businessId: string): Promise<DBProject[]>;
  findByOwnerId(ownerId: string): Promise<DBProject[]>;
}

export interface IBusinessPlanRepository extends IBaseRepository<DBBusinessPlan> {
  findByBusinessId(businessId: string): Promise<DBBusinessPlan[]>;
  getLatestVersion(businessId: string): Promise<DBBusinessPlan | null>;
}
