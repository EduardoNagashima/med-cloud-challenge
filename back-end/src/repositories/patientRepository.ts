import prisma from "../config/database.js";
import { patientData } from "../services/patientService.js";

async function create(patient: patientData) {
    await prisma.patient.create({ data: patient });
}

 async function getAll(){
    return prisma.patient.findMany({skip:0, take:10});
 }

async function findByEmail(email: string) {
    return prisma.patient.findUnique({ where: { email } })
}

async function deleteOne(id: number){
    await prisma.patient.delete({where:{id}})
}

export const patientRepository = {
    create,
    findByEmail,
    getAll,
    deleteOne
}