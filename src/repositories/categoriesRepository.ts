import connection from '../database/connection';
import { Category } from '../interfaces/categories';
import { RepositoriesFilters } from '../interfaces/repositoriesFilters';

export async function list(
  filter: RepositoriesFilters,
): Promise<Array<Category> | null> {
  let offset = '';
  let limit = '';
  if (filter.offset) {
    offset = `OFFSET ${filter.offset}`;
  }
  if (filter.limit) {
    limit = `LIMIT ${filter.limit}`;
  }

  const result = await connection.query(`
  SELECT * FROM categories
  ${offset}
  ${limit};`);
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
