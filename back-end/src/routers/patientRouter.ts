import { Router } from 'express';
import { deletePatient, get, post } from '../controllers/patientController.js';

const patientRouter = Router();

patientRouter.post('/patients', post);
patientRouter.get('/patients', get);
patientRouter.delete('/patients/:id', deletePatient)

export default patientRouter;