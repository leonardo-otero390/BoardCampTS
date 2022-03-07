import joi from 'joi';

export const cpfSchema = joi.string().pattern(/^\d{1,11}$/);

export const customer = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^\d{10,11}$/)
    .required(),
  cpf: cpfSchema.required(),
  birthday: joi.date().max('now').required(),
});

export const customerUpdate = joi.object({
  name: joi.string(),
  phone: joi.string().pattern(/^\d{10,11}$/),
  cpf: cpfSchema,
  birthday: joi.date().max('now'),
});
