import * as customersRepository from '../repositories/customersRepository';
import { Customer } from '../interfaces/interfaces';
import Conflict from '../errors/ConflictError';
import NoContent from '../errors/NoContentError';
import NotFound from '../errors/NotFoundError';

export async function insert(customer: Customer): Promise<Boolean | Error> {
  const cpfIsUsed = await customersRepository.findBycpf(customer.cpf);
  if (cpfIsUsed) throw new Conflict('Esse cpf já foi cadastrado');
  const result = await customersRepository.insert(customer);
  if (!result) throw new Error();
  return true;
}
export async function update(customer: Customer): Promise<Boolean | Error> {
  const cpfIsUsedByOther = await customersRepository.findBycpfNotId(
    customer.cpf,
    customer.id,
  );
  if (cpfIsUsedByOther) {
    throw new Conflict('Esse cpf já foi cadastrado por outro');
  }
  const result = await customersRepository.update(customer);
  if (!result) throw new Error();
  return true;
}
export async function list(cpf?: string): Promise<Array<Customer> | Error> {
  let Customers;
  if (cpf.length) {
    Customers = await customersRepository.listWithcpf(cpf);
  } else {
    Customers = await customersRepository.list();
  }
  if (!Customers || !Customers?.length) throw new NoContent();
  return Customers;
}

export async function findById(id: number): Promise<Customer | Error> {
  const result = await customersRepository.findById(id);
  if (!result) {
    throw new NotFound('Não foi encontrado nenhum cliente com esse id');
  }
  return result;
}
