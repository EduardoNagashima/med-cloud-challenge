import prisma from "../config/database.js";
import { update } from "../controllers/patientController.js";
import { patientData } from "../services/patientService.js";

async function create(patient: patientData) {
    await prisma.patient.create({ data: patient });
}

 async function getAll(skip: number, take: number){
    return prisma.patient.findMany({skip:skip, take:take});
 }

async function findByEmail(email: string) {
    return prisma.patient.findUnique({ where: { email } })
}

async function orderByName() {
    return prisma.patient.findMany({orderBy:{name: 'asc'}});
}

async function orderByEmail() {
    return prisma.patient.findMany({orderBy:{email: 'asc'}});
}

async function orderByCreationDate() {
    return prisma.patient.findMany({orderBy:{creationDate: 'desc'}});
}

async function deleteOne(id: number){
    await prisma.patient.delete({where:{id}})
}

async function updateOne(id: number, patient: patientData ){
    await prisma.patient.update({where: {id}, data: patient})
}

export const patientRepository = {
    create,
    updateOne,
    findByEmail,
    getAll,
    orderByCreationDate,
    orderByEmail,
    orderByName,
    deleteOne
}