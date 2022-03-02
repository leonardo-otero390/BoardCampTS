import * as gamesRepository from '../repositories/gamesRepository';
import * as categoriesRepository from '../repositories/categoriesRepository';
import { Game } from '../interfaces/interfaces';
import Conflict from '../errors/ConflictError';
import NoContent from '../errors/NoContentError';
import NotFound from '../errors/NotFoundError';

export async function insert(game: Game): Promise<Boolean | Error> {
  const gameAlreadyExists = await gamesRepository.findByName(game.name);
  if (gameAlreadyExists) throw new Conflict('Esse jogo já existe');
  const categoryIdIsValid = await categoriesRepository.findById(
    game.categoryId,
  );
  if (!categoryIdIsValid) {
    throw new NotFound('Esse id de categoria não é válido!');
  }
  const result = await gamesRepository.insert(game);
  if (!result) throw new Error();
  return true;
}

export async function list(): Promise<Array<Game> | Error> {
  const games = await gamesRepository.list();
  if (!games || !games?.length) throw new NoContent();
  return games;
}
