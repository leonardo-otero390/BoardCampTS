import connection from '../database/connection';
import {
  Rental,
  RentalGameCustomer,
  RentalFilters,
} from '../interfaces/rentals';

export async function insert(rental: Rental): Promise<Boolean> {
  const { customerId, gameId, daysRented, originalPrice } = rental;

  const result = await connection.query(
    `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
     VALUES ($1, $2, NOW(), $3, $4)`,
    [customerId, gameId, daysRented, originalPrice],
  );
  if (!result.rowCount) return false;
  return true;
}
export async function findOpenedRentalsByGameId(
  gameId: number,
): Promise<Array<Rental>> {
  const result = await connection.query(
    'SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL',
    [gameId],
  );
  if (!result.rowCount) return [];
  return result.rows;
}
export async function listWithCustomerAndGame(
  filter: RentalFilters,
): Promise<Array<RentalGameCustomer> | false> {
  let customerId = '';
  let gameId = '';
  let operator = '';
  let whereOperator = '';
  if (filter.customerId || filter.gameId) {
    whereOperator = 'WHERE';
    if (filter.customerId) {
      customerId = `customers.id = ${filter.customerId}`;
    }
    if (filter.gameId) {
      gameId = `games.id = ${filter.gameId}`;
    }
    if (filter.customerId && filter.gameId) {
      operator = 'AND';
    }
  }
  let offset = '';
  let limit = '';
  if (filter.offset) {
    offset = `OFFSET ${filter.offset}`;
  }
  if (filter.limit) {
    limit = `LIMIT ${filter.limit}`;
  }
  const result = await connection.query(
    `
  SELECT
  rentals.*,
  customers.id AS "customerId", customers.name AS "customerName",
  games.id AS "gameId", games.name AS "gameName",
  categories.name AS "categoryName"
  FROM rentals
  JOIN customers ON customers.id = rentals."customerId"
  JOIN games ON games.id = rentals."customerId"
  JOIN categories ON categories.id = games."categoryId"
  ${whereOperator} ${customerId} ${operator} ${gameId}
  ${offset}
    ${limit};
  `,
  );
  if (!result.rowCount) return false;
  return result.rows;
}
export async function findById(id: number): Promise<Rental | false> {
  const result = await connection.query('SELECT * FROM rentals WHERE id=$1;', [
    id,
  ]);
  if (!result.rowCount) return false;
  return result.rows[0];
}
export async function finish(delayFee: number, id: number) {
  const result = await connection.query(
    `
  UPDATE rentals
  SET "returnDate" = NOW() , "delayFee" = $1
  WHERE id = $2
  `,
    [delayFee, id],
  );
  if (!result.rowCount) return false;
  return result.rows;
}
export async function remove(id: number): Promise<Boolean> {
  const result = await connection.query(
    `
  DELETE FROM rentals WHERE id = $1
  `,
    [id],
  );
  if (!result.rowCount) return false;
  return true;
}
