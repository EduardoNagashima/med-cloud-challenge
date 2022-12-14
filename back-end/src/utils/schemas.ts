import Joi, { ObjectSchema } from "joi";
import { patientData } from "../services/patientService";

export const patientInfoSchema: ObjectSchema<patientData> = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().required(),
    zipCode: Joi.string().length(8).pattern(/^[0-9]+$/).required(),
    uf: Joi.string().length(2).valid("AC", "AL", "AP","AM", "BA","CE","DF","ES","GO","MA","MS","MT","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().integer().required(),
    neighborhood: Joi.string().required(),
    creationDate: Joi.date().optional()
})

export const getPatientsSchema: ObjectSchema = Joi.object({
    take: Joi.number().integer(),
    skip: Joi.number().integer()
})