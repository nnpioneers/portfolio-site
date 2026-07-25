# NNP DISASTER RECOVERY PLAN

## 1. Database Failure
**Symptom:** API returns `503 Service Unavailable` or `Database Error`.
**Action:**
1. Check MongoDB service status (`systemctl status mongod` or docker container).
2. If corrupted, restore from the latest automated backup in the `backups/` directory using `mongorestore`.
   ```bash
   mongorestore --uri="mongodb://localhost:27017/nnp" --gzip --archive="backups/nnp_backup_2026..._db.gz" --drop
   ```
3. Restart the backend Node.js process.

## 2. Server Failure / Hardware Crash
**Symptom:** Server completely unreachable.
**Action:**
1. Provision a new server instance.
2. Clone the NNP repository.
3. Copy `.env` from secure configuration backup.
4. Run `npm install` and `npm run build`.
5. Restore database from offsite backup (e.g., S3).
6. Update DNS to point to the new IP.

## 3. OpenAI / AI Provider Failure
**Symptom:** Generative features fail or hang.
**Action:**
1. Circuit Breaker will automatically detect and "open", failing fast.
2. The UI will receive graceful fallback messages.
3. Check OpenAI API status (status.openai.com).
4. No immediate technical action required; the Circuit Breaker will auto-recover when the provider is back online.

## 4. Knowledge Engine Corruption
**Symptom:** RAG retrieval returns garbage or throws file errors.
**Action:**
1. Delete the active `src/knowledge` vector indices.
2. Restore the latest `knowledge_manifest` backup.
3. Trigger the internal Knowledge Re-index API endpoint to regenerate embeddings.
