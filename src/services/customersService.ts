import * as customersRepository from '../repositories/customersRepository';
import { Customer } from '../interfaces/interfaces';
import Conflict from '../errors/ConflictError';

export async function insert(customer: Customer): Promise<Boolean | Error> {
  const cpfIsUsed = await customersRepository.findBycpf(customer.cpf);
  if (cpfIsUsed) throw new Conflict('Esse cpf já foi cadastrado');
  const result = await customersRepository.insert(customer);
  if (!result) throw new Error();
  return true;
}
