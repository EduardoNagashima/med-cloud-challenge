import { Patient } from "@prisma/client";
import { patientRepository } from "../repositories/patientRepository.js";

export type patientData = Omit<Patient, "id">;

export async function create(patient: patientData) {
    const emailExist = await patientRepository.findByEmail(patient.email);
    if (emailExist) throw { type: 'CONFLICT', message: 'Email já está sendo utilizado.' }
    await patientRepository.create(patient);
}

export async function getAll(){
    return await patientRepository.getAll();
}

export async function deleteOne(id: number) {
    return await patientRepository.deleteOne(id);
}

export const patientService = {
    create,
    deleteOne
}