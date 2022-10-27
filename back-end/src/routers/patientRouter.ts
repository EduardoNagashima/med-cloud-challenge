import { Router } from 'express';
import { deletePatient, get, post, update, getById } from '../controllers/patientController.js';
import {idValidation, patValidation} from "../middlewares/patientValidationMIddleware.js";

const patientRouter = Router();

patientRouter.post('/patients', patValidation, post);
patientRouter.get('/patients', get);
patientRouter.get('/patients/:id', idValidation, getById);
patientRouter.delete('/patients/:id', idValidation, deletePatient)
patientRouter.put('/patients/:id', idValidation, patValidation, update);

export default patientRouter;