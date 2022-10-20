import prisma from "../config/database.js";
import { patientData } from "../services/patientService.js";

async function create(patient: patientData) {
    await prisma.patient.create({ data: patient });
}

async function findByEmail(email: string) {
    return prisma.patient.findUnique({ where: { email } })
}

export const patientRepository = {
    create,
    findByEmail,
}