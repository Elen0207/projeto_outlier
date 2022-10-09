import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./pages/Cadastro";
import CalculoOutlier from "./pages/CalculoOutlier";
import Editar from "./pages/Editar";
import HistoricosAnalises from "./pages/HistoricosAnalises";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ResultadoAnalise from "./pages/ResultadoAnalise";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="menu" element={<Menu />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="edit-user" element={<Editar />} />
        <Route path="calculo" element={<CalculoOutlier />} />
        <Route path="resultado-analises" element={<ResultadoAnalise />} />
        <Route path="historicos" element={<HistoricosAnalises />} />
      </Routes>
    </BrowserRouter>       
  )
}