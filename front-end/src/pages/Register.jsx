/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {styled} from '@mui/material/styles';
import {TextField, Button, Divider, Select, MenuItem, Alert, AlertTitle} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoadingButton from '@mui/lab/LoadingButton';
import DataPicker from '../components/DataPicker';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import doctorPicture from '../assets/doctor.jpg';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uf, setUf] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [neighborhood, setNeighborhood] = useState('');
  const [ufInfos, setUfInfo] = useState([]);

  const handleChange = (event) => {
    setUf(event.target.value);
  };

  const findZip = (e) => {
    e.preventDefault();
    setZipCode(e.target.value);
    if (zipCode.length === 8) {
      setLoading(true);
      axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
          .then((res)=>{
            const {uf, logradouro, localidade, bairro} = res.data;
            setUf(uf);
            setCity(localidade);
            setStreet(logradouro);
            setNeighborhood(bairro);
            sucessAlert();
          })
          .catch((err)=>{
            console.error(err);
          })
          .finally(()=>{
            setLoading(false);
          });
    }
  };

  function sucessAlert() {
    alert('s');
    return <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
    </Alert>;
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
          <RegisterTitle>Registrar Novo Paciente:</RegisterTitle>
          <InputTag value={name} onChange={(e)=>{
            setName(e.target.value);
          }} id="name" label="Nome Completo" variant="outlined" />
          <InputTag value={email} onChange={(e)=>{
            setEmail(e.target.value);
          }} id="email" label="E-mail" variant="outlined" />
          <DataPicker/>
          <div>
            <Divider textAlign="left">Endereço</Divider>
          </div>
          <ZipDiv>
            <InputTag inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} value={zipCode} helperText="Somente Números" onChange={(e)=>setZipCode(e.target.value)}id="zipCode" label="CEP" variant="outlined" />
            <LoadingZipButton
              onClick={findZip}
              endIcon={<TravelExploreIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
            </LoadingZipButton>
          </ZipDiv>
          <StyledSelect id="state" value={uf} onChange={handleChange}>
            {ufInfos.map((el, index)=>{
              return <MenuItem key={el.nome+index} value={el.sigla}>{el.sigla}</MenuItem>;
            })}
          </StyledSelect>
          <InputTag value={city} onChange={(e)=>{
            setCity(e.target.value);
          }} id="city" label="Cidade" variant="outlined" />
          <InputTag value={street} onChange={(e)=>{
            setStreet(e.target.value);
          }} id="street" label="Rua" variant="outlined" />
          <InputTag value={neighborhood} onChange={(e)=>{
            setNeighborhood(e.target.value);
          }} id="neighborhood" label="Bairro" variant="outlined" />
          <Button variant="contained">Cadastrar</Button>
        </FormDiv>
        <SideImage src={doctorPicture} alt="" />
      </FormSection>

    </Container>

  );
}

const ZipDiv = styled('div')`
  display: flex;
  height: auto;
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
    height: 100%;
`;

const SideImage = styled('img')`
    width: 50%;
    object-fit: cover;
    border-radius: 0px 0px 10px 0px;
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
    display: flex;
    form {
        display: flex;
        flex-direction: column;
    }
`;

const InputTag = styled(TextField)`
    width: 100%;
    margin-bottom: 10px;
`;
