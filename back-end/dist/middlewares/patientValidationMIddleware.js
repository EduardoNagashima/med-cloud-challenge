import { patientInfoSchema } from '../utils/schemas.js';
export function idValidation(req, res, next) {
    var id = req.params.id;
    if (isNaN(parseInt(id)))
        throw { type: 'BAD_REQUEST', message: 'id de Paciente inválido' };
    next();
}
export function patValidation(req, res, next) {
    var patient = req.body;
    var error = patientInfoSchema.validate(patient).error;
    if (error)
        throw { type: "BAD_REQUEST", message: error.details[0].message };
    patient.number = +patient.number;
    res.locals.patient = patient;
    next();
}
