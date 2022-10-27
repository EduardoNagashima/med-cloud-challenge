import { Patient } from "@prisma/client";
import { patientRepository } from "../repositories/patientRepository.js";

export type patientData = Omit<Patient, "id">;

export async function create(patient: patientData) {
    const emailExist = await patientRepository.findByEmail(patient.email);
    if (emailExist) throw { type: 'CONFLICT', message: 'Email já está sendo utilizado.' }
    await patientRepository.create(patient);
}

export async function getAll(skip: number, take: number){
    return await patientRepository.getAll(skip, take);
}

export async function getByIdService(id: number){
    return await patientRepository.getById(id);
}

export async function deleteOne(id: number) {
    return await patientRepository.deleteOne(id);
}

export async function updateService(id: number, patient: Patient){
    delete patient.creationDate;
    const emailExists = await patientRepository.findByEmail(patient.email);
    if (emailExists && patient.id !== emailExists.id) throw { type: "CONFLICT", message: 'Email já está em uso' };
    await patientRepository.updateOne(id, patient);
}

export const patientService = {
    create,
    deleteOne,
    updateService
}