import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Patient from "./pages/Post";

import "./assets/reset.css";
import "./assets/style.css";

const App = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/patient/:id" element={<Patient  />} /> */}
                </Routes>
        </BrowserRouter>
    );
}
export default App;