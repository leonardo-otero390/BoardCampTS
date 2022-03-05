import connection from '../database/connection';
import { Rental, RentalGameCustomer } from '../interfaces/interfaces';

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
export async function listWithCustomerAndGame(): Promise<
  Array<RentalGameCustomer> | false
  > {
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
  JOIN categories ON categories.id = games."categoryId";
  `,
  );
  if (!result.rowCount) return false;
  return result.rows;
}
