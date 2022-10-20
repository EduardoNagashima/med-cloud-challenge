import { Patient } from "@prisma/client";
import { patientRepository } from "../repositories/patientRepository.js";

export type patientData = Omit<Patient, "id">;

export async function create(patient: patientData) {
    const emailExist = await patientRepository.findByEmail(patient.email);
    if (emailExist) throw { type: 'CONFLICT', message: 'Email já está sendo utilizado.' }
    await patientRepository.create(patient);
}

export const patientService = {
    create,
}