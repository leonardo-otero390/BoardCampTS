import connection from '../database/connection';
import { Game } from '../interfaces/interfaces';

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
export async function list(): Promise<Array<Game> | null> {
  const result = await connection.query(`
    SELECT games.*,categories.name AS "categoryName" FROM games 
    JOIN categories ON games."categoryId"=categories.id;`);
  if (!result.rowCount) return null;
  return result.rows;
}
export async function listWithQueryName(
  name: string,
): Promise<Array<Game> | null> {
  const queryName = `${name.toLowerCase()}%`;
  const result = await connection.query(
    `
    SELECT games.*,categories.name AS "categoryName" FROM games 
    JOIN categories ON games."categoryId"=categories.id
    WHERE LOWER(games.name) LIKE $1
  ;`,
    [queryName],
  );
  if (!result.rowCount) return null;
  return result.rows;
}
