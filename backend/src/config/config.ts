import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING || '',
  }
};

export default config;