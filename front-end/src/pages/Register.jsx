/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {styled} from '@mui/material/styles';
import {TextField, Button, Divider, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoadingButton from '@mui/lab/LoadingButton';
import DataPicker from '../components/DataPicker';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import doctorPicture from '../assets/doctor.jpg';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Register() {
  const [patientInfo, setPatientInfo] = useState({name: '', email: ''});
  const [birthdate, setBirthdate] = useState('01/01/2000');
  const [adress, setAdress] = useState({uf: '', street: '', neighborhood: ''});
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [ufInfos, setUfInfo] = useState([]);

  const handleChange = (event) => {
    setAdress({...adress, uf: event.target.value});
  };

  const findZip = (e) => {
    e.preventDefault();
    if (zipCode.length === 8) {
      setLoading(true);
      axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
          .then((res)=>{
            const {uf, logradouro, localidade, bairro, erro} = res.data;
            if (erro) {
              setAdress({uf: '', street: '', neighborhood: ''});
              return;
            }
            setAdress({...adress, uf: uf, city: localidade, street: logradouro, neighborhood: bairro});
          })
          .catch((err)=>{
            console.error(err);
          })
          .finally(()=>{
            setLoading(false);
          });
    }
  };

  function submitPatient(e) {
    e.preventDefault();
    console.log(patientInfo, adress, zipCode)
  }

  useEffect(()=>{
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((res)=>{
          setUfInfo(res.data);
        });
  }, []);

  return (
    <Container>
      <Navbar select={'Adicionar'}/>
      <FormSection>
        <FormDiv>
          <form onSubmit={submitPatient}>
          <RegisterTitle>Registrar Novo Paciente:</RegisterTitle>
          <InputTag required value={patientInfo.name} 
          onChange={(e)=>{setPatientInfo({...patientInfo, name: e.target.value})}} id="name" label="Nome Completo" variant="outlined" />
          <InputTag required value={patientInfo.email} onChange={(e)=>{setPatientInfo({...patientInfo, email: e.target.value})}} id="email" label="E-mail" variant="outlined" />
          <DataPicker birthdate={birthdate} setBirthdate={setBirthdate}/>
          <div>
            <Divider textAlign="left">Endereço</Divider>
          </div>
          <ZipDiv>
            <InputTag required error={isNaN(zipCode)} inputProps={{maxLength: 8}}  value={zipCode} helperText={isNaN(zipCode) ? 'Somente números' : ''} onChange={(e)=>setZipCode(e.target.value) 
              }id="zipCode" label="CEP" variant="outlined" />
            <LoadingZipButton
              disabled={!(zipCode.length === 8) || isNaN(zipCode)}
              onClick={findZip}
              endIcon={<TravelExploreIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
            </LoadingZipButton>
          </ZipDiv>
          <FormControl>
              <InputLabel id="uf-label">UF</InputLabel>
              <StyledSelect required labelId="uf-label" label="UF" id="uf" value={adress.uf} onChange={handleChange}>
                {ufInfos.map((el, index)=>{
                  return <MenuItem key={el.nome+index} value={el.sigla}>{el.sigla}</MenuItem>;
                })}
              </StyledSelect>
          </FormControl>
          <InputTag required value={adress.city} onChange={(e)=>{
            setAdress({...adress, city: e.target.value});
          }} id="city" label="Cidade" variant="outlined" />
          <InputTag required value={adress.street} onChange={(e)=>{
            setAdress({...adress, street: e.target.value});
          }} id="street" label="Rua" variant="outlined" />
          <InputTag required value={adress.neighborhood} onChange={(e)=>{
           setAdress({...adress, neighborhood: e.target.value});
          }} id="neighborhood" label="Bairro" variant="outlined" />
          <button disabled={loading}> <FormButton disabled={loading} variant="contained">Cadastrar
          </FormButton>
          </button>
          </form>
        </FormDiv>
        <SideImage src={doctorPicture} alt="paciente-e-doutor" />
      </FormSection>
    </Container>
  );
}

const FormButton = styled(Button)`
  width: 610px;
  margin-left: -5px;
  font-size: 18px;
  font-weight: 700;
`

const ZipDiv = styled('div')`
  display: flex;
`;

const LoadingZipButton =styled(LoadingButton)`
    height: 55px;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledSelect = styled(Select)`
    margin-bottom: 10px;
`;

const FormSection =styled('section')`
    display: flex;
    height: 700px;
`;

const SideImage = styled('img')`
    border-top: 10px solid #08316A;
    border-left: 4px solid #08316A;
    object-fit: cover;
    width: 50%;
    height: 100%;
    border-radius: 0px 10px 10px 200px;
`;

const RegisterTitle = styled('p')`
    text-align: start;
    font-size: 30px;
    margin: 0px;
    margin-bottom: 10px;
    font-family: 'Libre Franklin', sans-serif;
`;

const FormDiv = styled('div')`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 20px;
    height: 100%;
    display: flex;
    form {
        display: flex;
        flex-direction: column;
    }
    button {
      border: none;
    }
`;

const InputTag = styled(TextField)`
    width: 100%;
    margin-bottom: 10px;
`;
