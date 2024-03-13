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
        <Route path="/gestion-des-formations" element={<Accuelle/>} />
        <Route path="gestion-des-formations/employes" element={<Employes />} />
        <Route path="gestion-des-formations/employes/add" element={<AddEmploye />} />
        <Route path="gestion-des-formations/employes/:id" element={<EditeEmploye />} />
        <Route path="gestion-des-formations/formations" element={<Formations />} />
        <Route path="gestion-des-formations/formations/add" element={<AddFormtion />} />
        <Route path="gestion-des-formations/formations/:id" element={<EditeFormation />} />
        <Route path="gestion-des-formations/participations" element={<Participations />} />
        <Route path="gestion-des-formations/participations/add" element={<AddParticipation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
