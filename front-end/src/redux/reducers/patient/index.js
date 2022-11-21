import * as types from '../../types';

const initialState = {
    patient: {
        name: '', 
        email: '', 
        city: '',
        uf: '', 
        street: '', 
        neighborhood: '', 
        number: ''
    },
    loading: false,
    error: ''
}

export const patientReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SELECT_PATIENT:
            return {
                ...state,
                newValue: action.newValue
            };
        case types.GET_PATIENT_REQUEST:
            return {
                ...state,
                loading: true,
                patient: action.payload,
                error: ''
            }
        case types.GET_PATIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                patient: action.payload,
                error: ''
            }
        case types.GET_PATIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: 'Deu ruim na requisição'
            }
        default: 
            return state;
    }
}