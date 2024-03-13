import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employes from "./pages/employes/Employes";
import EditeEmploye from "./pages/employes/EditeEmploye";
import AddEmploye from "./pages/employes/AddEmploye";

import Formations from "./pages/formations/Formations";
import AddFormtion from "./pages/formations/AddFormtion";
import EditeFormation from "./pages/formations/EditeFormation";

import Participations from "./pages/participations/Participations";
import AddParticipation from "./pages/participations/AddParticipation";

import Navbar from './Componentes/Navbar/Navbar';
import Accuelle from "./pages/accuelle/Accuelle";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accuelle/>} />
        <Route path="/employes" element={<Employes />} />
        <Route path="/employes/add" element={<AddEmploye />} />
        <Route path="/employes/:id" element={<EditeEmploye />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/formations/add" element={<AddFormtion />} />
        <Route path="/formations/:id" element={<EditeFormation />} />
        <Route path="/participations" element={<Participations />} />
        <Route path="/participations/add" element={<AddParticipation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
