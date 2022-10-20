import { Request, Response } from "express";
import { patientInfoSchema } from '../utils/schemas.js';
import { create } from "../services/patientService.js";

export async function post(req: Request, res: Response) {
    const patient = req.body;
    const { error } = patientInfoSchema.validate(patient);
    if (error) throw { type: 'BAD_REQUEST', message: error.details[0].message };
    patient.zipCode = parseInt(patient.zipCode);
    patient.number = parseInt(patient.number);
    await create(patient);

    res.sendStatus(201);
}