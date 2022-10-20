import { Router } from 'express';
import { post } from '../controllers/patientController.js';

const patientRouter = Router();

patientRouter.post('/patients', post);
patientRouter.get('/patients');

export default patientRouter;