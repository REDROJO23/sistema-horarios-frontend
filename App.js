import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';
import ConsultaPage from '../pages/ConsultaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroPage />} />
        <Route path="/consulta" element={<ConsultaPage />} />
      </Routes>
    </Router>
  );
}

export default App;