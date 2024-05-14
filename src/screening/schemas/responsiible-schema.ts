import Joi from "joi";

export const responsibleSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  kinship: Joi.string().required(),
  phone: Joi.string().required(),
  civil_state: Joi.string().required(),
  profession: Joi.string().required(),
  address: Joi.string().required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.string().required(),
  id_screening: Joi.number().optional()
});
