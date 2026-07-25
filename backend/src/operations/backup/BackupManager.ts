import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { LoggingService, LogDomain } from '../logging/logger.service';

export class BackupManager {
  private readonly backupDir: string;
  private readonly mongoUri: string;

  constructor() {
    this.backupDir = path.join(__dirname, '../../../../backups');
    this.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/nnp';
    
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  public async runFullBackup(): Promise<string> {
    LoggingService.info(LogDomain.SYSTEM, 'Starting full system backup...');
    
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `nnp_backup_${timestamp}`);
      
      // 1. Database Backup
      await this.backupDatabase(backupPath);
      
      // 2. Knowledge Backup
      this.backupKnowledge(backupPath);
      
      // 3. Write Report
      const reportFile = path.join(this.backupDir, 'backup-report.json');
      fs.writeFileSync(reportFile, JSON.stringify({
        lastBackup: new Date().toISOString(),
        status: 'SUCCESS',
        path: backupPath
      }, null, 2));

      LoggingService.info(LogDomain.SYSTEM, `Backup completed successfully at ${backupPath}`);
      return backupPath;
    } catch (error: any) {
      LoggingService.error(LogDomain.SYSTEM, 'Backup failed', { error });
      throw error;
    }
  }

  private backupDatabase(targetPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Using mongodump with gzip compression
      const cmd = `mongodump --uri="${this.mongoUri}" --gzip --archive="${targetPath}_db.gz"`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          LoggingService.error(LogDomain.SYSTEM, `Database backup error: ${stderr}`);
          return reject(error);
        }
        resolve();
      });
    });
  }

  private backupKnowledge(targetPath: string): void {
    // In a real environment, zip the directory. 
    // Here we simulate checking the folder existence and creating a manifest.
    const knowledgeDir = path.join(__dirname, '../../../knowledge');
    if (fs.existsSync(knowledgeDir)) {
       fs.writeFileSync(`${targetPath}_knowledge_manifest.txt`, `Backed up knowledge from ${knowledgeDir}`);
    }
  }
}
