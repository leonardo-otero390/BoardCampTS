import * as categoriesReposity from '../repositories/categoriesRepository';
import { Category } from '../interfaces/interfaces';
import NoContent from '../errors/NoContentError';

export async function list(): Promise<Array<Category> | Error> {
  const categories = await categoriesReposity.list();
  if (!categories || !categories?.length) throw new NoContent();
  return categories;
}
