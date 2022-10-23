import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RefreshContext from "./contexts/RefreshContext";
import CssBaseline from '@mui/material/CssBaseline';
import Title from './components/Title';
import Home from './pages/Home';
import Register from './pages/Register';
import Patients from './pages/Patients';
import About from './pages/About';
import { useContext, useState } from 'react';

import './assets/style.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <CssBaseline/>
      <Title />
      <RefreshContext.Provider value={{count, setCount}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes/adicionar" element={<Register />} />
        <Route path="/pacientes" element={<Patients />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      </RefreshContext.Provider>
    </BrowserRouter>
  );
};
export default App;
