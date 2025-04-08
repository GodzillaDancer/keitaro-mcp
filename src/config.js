import dotenv from 'dotenv';
    import { fileURLToPath } from 'url';
    import { dirname, join } from 'path';
    import fs from 'fs';

    // Get the directory name of the current module
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const rootDir = dirname(__dirname);

    // Try to load .env file
    dotenv.config({ path: join(rootDir, '.env') });

    // Configuration with defaults and validation
    export const config = {
      apiUrl: process.env.KEITARO_API_URL || '',
      apiKey: process.env.KEITARO_API_KEY || '',
      isConfigured: function() {
        return this.apiUrl && this.apiKey;
      }
    };

    // Create a sample .env file if it doesn't exist
    const envPath = join(rootDir, '.env');
    if (!fs.existsSync(envPath)) {
      try {
        const exampleEnvPath = join(rootDir, '.env.example');
        if (fs.existsSync(exampleEnvPath)) {
          const exampleContent = fs.readFileSync(exampleEnvPath, 'utf8');
          fs.writeFileSync(envPath, exampleContent);
          console.log('Created .env file from example. Please update with your Keitaro credentials.');
        }
      } catch (error) {
        console.error('Error creating .env file:', error.message);
      }
    }
