import prisma from "../config/database.js";
import { patientData } from "../services/patientService.js";

async function create(patient: patientData) {
    await prisma.patient.create({ data: patient });
}

 async function getAll(skip: number, take: number){
    return await prisma.patient.findMany({skip:skip, take:take});
 }

async function findByEmail(email: string) {
    return  await prisma.patient.findUnique({ where: { email } })
}

async function orderByName() {
    return await prisma.patient.findMany({orderBy:{name: 'asc'}});
}

async function orderByEmail() {
    return await prisma.patient.findMany({orderBy:{email: 'asc'}});
}

async function orderByCreationDate() {
    return await prisma.patient.findMany({orderBy:{creationDate: 'desc'}});
}

async function deleteOne(id: number){
    await prisma.patient.delete({where:{id}})
}

async function updateOne(id: number, patient: patientData ){
    await prisma.patient.update({where: {id}, data: patient})
}

async function getById(id: number){
    return await prisma.patient.findUnique({where: {id}})
}

export const patientRepository = {
    create,
    getById,
    updateOne,
    findByEmail,
    getAll,
    orderByCreationDate,
    orderByEmail,
    orderByName,
    deleteOne
}