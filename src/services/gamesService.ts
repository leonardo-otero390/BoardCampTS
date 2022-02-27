import * as gamesRepository from '../repositories/gamesRepository';
import { Game } from '../interfaces/interfaces';
import Conflict from '../errors/ConflictError';

export async function insert(game: Game): Promise<Boolean | Error> {
  const gameAlreadyExists = await gamesRepository.findByName(game.name);
  if (gameAlreadyExists) throw new Conflict('Esse jogojá existe');
  const result = await gamesRepository.insert(game);
  if (!result) throw new Error();
  return true;
}
