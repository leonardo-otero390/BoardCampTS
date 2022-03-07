import { cpfSchema } from '../schemas/customerSchemas';

export function validatecpf(cpf: string): Boolean {
  const validation = cpfSchema.validate(cpf);
  if (validation.error) return false;
  return true;
}
