import * as rentalsRepository from '../repositories/rentalsRepository';
import * as customersRepository from '../repositories/customersRepository';
import * as gamesRepository from '../repositories/gamesRepository';
import { Rental } from '../interfaces/interfaces';
import NotFound from '../errors/NotFoundError';

export async function insert(rental: Rental): Promise<Boolean | Error> {
  const game = await gamesRepository.findById(rental.gameId);
  if (!game) throw new NotFound('Esse gameId não é válido!');
  const customer = await customersRepository.findById(rental.customerId);
  if (!customer) throw new NotFound('Esse customerId não é válido!');
  const gameRentals = await rentalsRepository.findOpenedRentalsByGameId(
    game.id,
  );
  if (game.stockTotal < gameRentals.length) {
    throw new NotFound('Não há jogos suficientes no stock!');
  }
  const originalPrice = rental.daysRented * game.pricePerDay;
  const result = await rentalsRepository.insert({ ...rental, originalPrice });
  if (!result) throw new Error();
  return true;
}
