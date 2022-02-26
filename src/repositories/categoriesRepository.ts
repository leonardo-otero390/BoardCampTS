import connection from '../database/connection';
import { Category } from '../interfaces/interfaces';

export async function list(): Promise<Array<Category> | null> {
  const result = await connection.query('SELECT * FROM categories;');
  if (!result.rowCount) return null;
  return result.rows;
}
