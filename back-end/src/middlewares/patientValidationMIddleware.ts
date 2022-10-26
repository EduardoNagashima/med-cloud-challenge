import { Patient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {  patientInfoSchema } from '../utils/schemas.js';

export function idValidation(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if(isNaN(parseInt(id))) throw { type: 'BAD_REQUEST', message: 'id de Paciente inválido' };
  next();
}

export function patValidation(req: Request, res: Response, next: NextFunction) {
  const patient: Patient = req.body;
  const { error } = patientInfoSchema.validate(patient);
  if (error) throw { type: "BAD_REQUEST", message: error.details[0].message };
  patient.number = +patient.number;
  res.locals.patient = patient;
  next();
}