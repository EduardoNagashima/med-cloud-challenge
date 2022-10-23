import { Request, Response } from "express";
import { patientInfoSchema } from '../utils/schemas.js';
import { create, deleteOne, getAll } from "../services/patientService.js";

export async function post(req: Request, res: Response) {
    const patient = req.body;
    const { error } = patientInfoSchema.validate(patient);
    if (error) throw { type: 'BAD_REQUEST', message: error.details[0].message };
    patient.zipCode = parseInt(patient.zipCode);
    patient.number = parseInt(patient.number);
    await create(patient);

    res.sendStatus(201);
}

export async function get(req: Request, res:Response) {
    const patients = await getAll();
    res.send(patients);
}

export async function deletePatient(req: Request, res:Response){
    const {id} = req.params; 
    if(isNaN(parseInt(id))) throw { type: 'BAD_REQUEST', message: 'id de Paciente inválido' };
    await deleteOne(parseInt(id));
    res.sendStatus(204);
}