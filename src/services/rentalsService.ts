import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import * as rentalsRepository from '../repositories/rentalsRepository';
import * as customersRepository from '../repositories/customersRepository';
import * as gamesRepository from '../repositories/gamesRepository';
import {
  Rental,
  RentalFilters,
  RentalGameCustomer,
} from '../interfaces/interfaces';
import NotFound from '../errors/NotFoundError';
import BadRequest from '../errors/BadRequestError';
import NoContent from '../errors/NoContentError';

function buildRentalObject(rental: RentalGameCustomer) {
  const customer = {
    id: rental.customerId,
    name: rental.customerName,
  };
  const game = {
    id: rental.gameId,
    name: rental.gameName,
    categoryId: rental.categoryId,
    categoryName: rental.categoryName,
  };
  const result = {
    ...rental,
    customer,
    game,
  };

  delete result.customerName;
  delete result.gameName;
  delete result.categoryId;
  delete result.categoryName;

  return result;
}

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
async function validateGameAndCustomer(rentalFilters: RentalFilters) {
  if (rentalFilters.gameId) {
    const game = await gamesRepository.findById(rentalFilters.gameId);
    if (!game) throw new NotFound('Esse gameId não é válido!');
  }
  if (rentalFilters.customerId) {
    const customer = await customersRepository.findById(
      rentalFilters.customerId,
    );
    if (!customer) throw new NotFound('Esse customerId não é válido!');
  }
  return true;
}
export async function list(filter: RentalFilters) {
  await validateGameAndCustomer(filter);
  const rentals = await rentalsRepository.listWithCustomerAndGame(filter);
  if (!rentals) throw new NoContent();
  const result = rentals.map(buildRentalObject);
  return result;
}
export async function finish(id: number): Promise<Boolean | Error> {
  const rental = await rentalsRepository.findById(id);
  if (!rental) throw new NotFound('Esse id de aluguel não é válido!');
  if (rental.returnDate) throw new BadRequest('Eita esse ja tá finalizado');
  const { rentDate, originalPrice, daysRented } = rental;
  const returnDate = dayjs().format('YYYY-MM-DD');
  dayjs.extend(relativeTime);
  let daysPassed: any = dayjs(returnDate).from(rentDate, true);
  if (daysPassed === 'a day') {
    daysPassed = 1;
  } else {
    daysPassed = daysPassed.match(/[0-9]{0,2}/);
  }
  const pricePerDay = originalPrice / daysRented;
  let delayFee = (daysPassed - daysRented) * pricePerDay;
  if (delayFee <= 0) delayFee = null;
  const result = await rentalsRepository.finish(delayFee, id);
  if (!result) throw new Error();
  return true;
}
export async function remove(id: number): Promise<boolean> {
  const rental = await rentalsRepository.findById(id);
  if (!rental) throw new NotFound('Esse id de aluguel não é válido!');
  if (rental.returnDate) throw new BadRequest('Eita esse ja tá finalizado');
  await rentalsRepository.remove(id);
  return true;
}
