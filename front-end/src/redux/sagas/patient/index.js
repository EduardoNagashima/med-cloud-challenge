import * as types from '../../types';
// import api from "../../../services/api";

let patientApi; 

const patientRequest = async(id)=>{
    // await api.get(`patients/${id}`).then((res) => {
    //     setSelected(res.data);
    //   });
    try{
        const request = await fetch(`http://localhost:5000/patients/${id}`)
        const response = await request.json()
        patientApi = response;
        return true;
    } catch(e){
        return false;
    }
}