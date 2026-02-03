// prisma.config.ts
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  
  // Database connection for migrations is set via the DATABASE_URL environment variable.
  // If you need to use a different URL for migrations, set the MIGRATE_DATABASE_URL environment variable.
})