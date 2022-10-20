import Joi, { ObjectSchema } from "joi";

export const patientInfoSchema: ObjectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().required(),
    zipCode: Joi.string().length(8).pattern(/^[0-9]+$/).required(),
    uf: Joi.string().length(2).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().integer().required(),
    neighborhood: Joi.string().required(),
})