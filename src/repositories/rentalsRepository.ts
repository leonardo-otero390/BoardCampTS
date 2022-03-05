import connection from '../database/connection';
import {
  Rental,
  RentalGameCustomer,
  RentalFilters,
} from '../interfaces/interfaces';

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
  ${whereOperator} ${customerId} ${operator} ${gameId};
  `,
  );
  if (!result.rowCount) return false;
  return result.rows;
}
