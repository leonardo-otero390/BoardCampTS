import * as categoriesRepository from '../repositories/categoriesRepository';
import { Category } from '../interfaces/categories';
import { RepositoriesFilters } from '../interfaces/repositoriesFilters';
import NoContent from '../errors/NoContentError';
import Conflict from '../errors/ConflictError';

export async function list(
  filter: RepositoriesFilters,
): Promise<Array<Category> | Error> {
  const categories = await categoriesRepository.list(filter);
  if (!categories || !categories?.length) throw new NoContent();
  return categories;
}

export async function insert(name: string): Promise<Boolean | Error> {
  const categoryAlreadyExists = await categoriesRepository.findByName(name);
  if (categoryAlreadyExists) throw new Conflict('A categoria já existe');
  const result = await categoriesRepository.insert(name);
  if (!result) throw new Error();
  return true;
}
