import '../setup';
import pg, { PoolConfig } from 'pg';

const { Pool } = pg;
interface SSLConfig extends PoolConfig {
  connectionString?: string;
}

let config: SSLConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'prod') {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const connection = new Pool(config);

export default connection;
