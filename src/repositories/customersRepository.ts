import connection from '../database/connection';
import { Customer } from '../interfaces/interfaces';

export async function insert(customer: Customer): Promise<Boolean> {
  const { name, phone, cpf, birthday } = customer;

  const result = await connection.query(
    `INSERT INTO customers (name, phone, cpf, birthday)
     VALUES ($1, $2, $3, $4)`,
    [name, phone, cpf, birthday],
  );
  if (!result.rowCount) return false;
  return true;
}

export async function findBycpf(cpf: string): Promise<Customer | null> {
  const result = await connection.query(
    'SELECT * FROM customers WHERE cpf = $1 LIMIT 1',
    [cpf],
  );
  if (!result.rowCount) return null;
  return result.rows[0];
}
