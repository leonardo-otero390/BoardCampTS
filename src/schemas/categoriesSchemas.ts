import joi from 'joi';

export const name = joi.object({
  name: joi.string().required(),
});
