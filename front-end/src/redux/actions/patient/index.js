import * as types from "../../types";

export const selectPatient = newValue => ({
    type: types.SELECT_PATIENT,
    newValue
})

export function getPatientRequest(id){
    return {
        type: types.GET_PATIENT_REQUEST,
        payload: id
    }
}

export function getPatientSuccess(patient){
    return {
        type: types.GET_PATIENT_SUCCESS,
        payload: patient
    }
}

export function getPatientfailure(){
    return {
        type: types.GET_PATIENT_FAILURE
    }
}