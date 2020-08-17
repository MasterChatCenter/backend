const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT
});

exports.list = async (table, query = "") => {
  const response = await pool.query(`SELECT * FROM ${table} ${query}`);
  return response;
}

exports.getById = async (table, id, extra) => {
  const response = await pool.query(`SELECT * FROM ${table} WHERE id = ${id} ${extra}`);
  return response;
}

exports.create = async (table, insertQuery) => {
  const response = await pool.query(`INSERT INTO ${table} ${insertQuery}`);
  return response;
}

exports.update = async (table, id, updateQuery) => {
  const response = await pool.query(`UPDATE ${table} SET ${insertQuery} WHERE WHERE id = ${id}`);
  return response;
}

exports.delete = async (table, id) => {
  const response = await pool.query(`DELETE FROM ${table} id = ${id}`);
  return response;
}
