import { Request, Response } from "express";
import { getPatientsSchema } from '../utils/schemas.js';
import { create, deleteOne, getAll, updateService } from "../services/patientService.js";
import { patientRepository } from "../repositories/patientRepository.js";

export async function post(req: Request, res: Response) {
    const {patient} = res.locals;
    await create(patient);

    return res.sendStatus(201);
}

export async function get(req: Request, res:Response) {
    const {take, skip} = req.body;
    const {type} = req.query;
    if (type) {
        if (type === 'creationDate') {
            const patients = await patientRepository.orderByCreationDate();
            return res.send(patients);
        }
        if (type === 'name'){
            const patients = await patientRepository.orderByName();
            return res.send(patients);
        }
        if (type === 'email'){
            const patients = await patientRepository.orderByEmail();
            return res.send(patients);
        }
        throw { type: 'BAD_REQUEST', message: 'Undefined type' };
    } 
    const {error} = getPatientsSchema.validate(req.body);
    if (error) throw { type: 'BAD_REQUEST', message: error.details[0].message };
    const patients = await getAll(take, skip);
    return res.send(patients);
}

export async function deletePatient(req: Request, res:Response){
    const {id} = req.params; 
    
    await deleteOne(parseInt(id));
    return res.sendStatus(204);
}

export async function update(req: Request, res: Response){
    const {patient} = res.locals;
    const {id} = req.params;

    await updateService(parseInt(id), patient);

    return res.sendStatus(204);
}