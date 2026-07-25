import { DBUser } from '../models';

export interface FrontendUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UserMapper = {
  toFrontend(dbUser: DBUser): FrontendUser {
    return {
      id: dbUser._id, // Map _id to id securely
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role
    };
  }
};
