import { illnessesSchema } from "#/screening/schemas/illnesses-schema";
import { responsibleSchema } from "#/screening/schemas/responsiible-schema";
import { specialNeedsSchema } from "#/screening/schemas/special-needs-schema";
import Joi from "joi";

export const screeningSchema = Joi.object({
  id: Joi.number().optional(),
  id_resident: Joi.number().required(),
  religion: Joi.string().required(),
  smoking: Joi.boolean().required(),
  entry_date: Joi.date().required(),
  father_name: Joi.string().required(),
  mother_name: Joi.string().required(),
  source_of_income: Joi.string().required(),
  income: Joi.number().required(),
  health_insurance: Joi.string().required(),
  funeral_insurance: Joi.string().required(),
  number_of_sibling: Joi.number().required(),
  number_of_children: Joi.number().required(),
  number_of_grandchildren: Joi.number().required(),
  Responsible: responsibleSchema.required(),
  Illnesses: Joi.array().items(illnessesSchema).optional(),
  SpecialNeeds: Joi.array().items(specialNeedsSchema).optional()
});