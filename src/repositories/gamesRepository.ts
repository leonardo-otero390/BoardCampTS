import connection from '../database/connection';
import { Game } from '../interfaces/games';
import { RepositoriesFilters } from '../interfaces/repositoriesFilters';

export async function insert(game: Game): Promise<Boolean> {
  const { name, image, stockTotal, categoryId, pricePerDay } = game;

  const result = await connection.query(
    `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
     VALUES ($1, $2, $3, $4, $5)`,
    [name, image, stockTotal, categoryId, pricePerDay],
  );
  if (!result.rowCount) return false;
  return true;
}
export async function findByName(name: string): Promise<Game | null> {
  const result = await connection.query(
    'SELECT * FROM games WHERE name = $1 LIMIT 1',
    [name],
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}
export async function findById(id: number): Promise<Game | null> {
  const result = await connection.query(
    'SELECT * FROM games WHERE id = $1 LIMIT 1',
    [id],
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}
export async function list(
  filter: RepositoriesFilters,
): Promise<Array<Game> | null> {
  let offset = '';
  let limit = '';
  if (filter.offset) {
    offset = `OFFSET ${filter.offset}`;
  }
  if (filter.limit) {
    limit = `LIMIT ${filter.limit}`;
  }
  const result = await connection.query(`
    SELECT games.*,categories.name AS "categoryName" FROM games 
    JOIN categories ON games."categoryId"=categories.id
    ${offset}
  ${limit};`);
  if (!result.rowCount) return null;
  return result.rows;
}
export async function listWithQueryName(
  filter: RepositoriesFilters,
  name: string,
): Promise<Array<Game> | null> {
  let offset = '';
  let limit = '';
  if (filter.offset) {
    offset = `OFFSET ${filter.offset}`;
  }
  if (filter.limit) {
    limit = `LIMIT ${filter.limit}`;
  }
  const queryName = `${name.toLowerCase()}%`;
  const result = await connection.query(
    `
    SELECT games.*,categories.name AS "categoryName" FROM games 
    JOIN categories ON games."categoryId"=categories.id
    WHERE LOWER(games.name) LIKE $1
    ${offset}
    ${limit};`,
    [queryName],
  );
  if (!result.rowCount) return null;
  return result.rows;
}
