import { DBUser } from '../models';

export const validateUser = (data: Partial<DBUser>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (data.name && data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
