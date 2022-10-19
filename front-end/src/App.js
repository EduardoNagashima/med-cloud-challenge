import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Title from "./components/Title";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Patients from "./pages/Patients";
import About from "./pages/About";

import "./assets/style.css";

const App = () => {
    return (
        <BrowserRouter>
        <CssBaseline/>
                <Title />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pacientes/adicionar" element={<Register />} />
                    <Route path="/pacientes" element={<Patients />} />
                    <Route path="/sobre" element={<About />} />
                    {/* <Route path="/patient/:id" element={<Patient  />} /> */}
                </Routes>
        </BrowserRouter>
    );
}
export default App;