import { Router } from 'express';
import { deletePatient, get, post, update } from '../controllers/patientController.js';
import {idValidation, patValidation} from "../middlewares/patientValidationMIddleware.js";

const patientRouter = Router();

patientRouter.post('/patients', patValidation, post);
patientRouter.get('/patients', get);
patientRouter.delete('/patients/:id', idValidation, deletePatient)
patientRouter.put('/patients/:id', idValidation, patValidation, update);

export default patientRouter;