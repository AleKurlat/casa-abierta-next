// conexión con base de datos Casa Abierta
import { Pool } from "pg";

const settingsPG = {
  "host": process.env.HOST,
  "user": process.env.USER,
  "password": process.env.PASS,
  "database": process.env.DB,
  "port": process.env.DB_PORT,
  "max": 3,
  "idleTimeoutMillis": 3000
};

const pool = new Pool(settingsPG);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export { pool };