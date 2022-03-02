import connection from '../database/connection';
import { Category } from '../interfaces/interfaces';

export async function list(): Promise<Array<Category> | null> {
  const result = await connection.query('SELECT * FROM categories;');
  if (!result.rowCount) return null;
  return result.rows;
}

export async function findByName(name: string): Promise<Category | null> {
  const result = await connection.query(
    'SELECT * FROM categories WHERE name = $1 LIMIT 1',
    [name],
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}

export async function findById(id: number): Promise<Category | null> {
  const result = await connection.query(
    'SELECT * FROM categories WHERE id = $1 LIMIT 1',
    [id],
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}

export async function insert(name: string): Promise<Boolean> {
  const result = await connection.query(
    'INSERT INTO categories (name) VALUES ($1)',
    [name],
  );
  if (!result.rowCount) return false;
  return true;
}
