import * as categoriesReposity from '../repositories/categoriesRepository';
import { Category } from '../interfaces/interfaces';
import NoContent from '../errors/NoContentError';
import Conflict from '../errors/ConflictError';

export async function list(): Promise<Array<Category> | Error> {
  const categories = await categoriesReposity.list();
  if (!categories || !categories?.length) throw new NoContent();
  return categories;
}

export async function insert(name: string): Promise<Boolean | Error> {
  const categoryAlreadyExists = await categoriesReposity.findByName(name);
  if (categoryAlreadyExists) throw new Conflict('A categoria já existe');
  const result = await categoriesReposity.insert(name);
  if (!result) throw new Error();
  return true;
}
