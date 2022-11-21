import { combineReducers } from 'redux';
import { patientReducer } from './patient';

const rootReducer = combineReducers({
   patient: patientReducer,
});

export default rootReducer;