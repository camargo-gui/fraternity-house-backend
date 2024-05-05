import Joi from "joi";

export const illnessesSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  screeningId: Joi.number().optional()
});