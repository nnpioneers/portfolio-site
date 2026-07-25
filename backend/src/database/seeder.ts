import { DatabaseManager } from '../config/db';
import { UserModel } from './schemas/user.schema';
import { BusinessModel } from './schemas/business.schema';

export class Seeder {
  static async run(): Promise<void> {
    try {
      console.log('[Seeder] Checking database state...');
      const userCount = await UserModel.countDocuments();
      
      if (userCount === 0) {
        console.log('[Seeder] Database is empty. Seeding demo data...');
        
        const admin = await UserModel.create({
          name: 'Demo Admin',
          email: 'admin@nnp.test',
          role: 'SUPER_ADMIN'
        });

        await BusinessModel.create({
          name: 'Demo SaaS Corp',
          industry: 'Software',
          ownerId: admin._id,
          stage: 'SCALING'
        });

        console.log('[Seeder] ✅ Demo data successfully created.');
      } else {
        console.log('[Seeder] Database already populated. Skipping seed.');
      }
    } catch (error) {
      console.error('[Seeder] ❌ Seeding failed:', error);
    }
  }
}
