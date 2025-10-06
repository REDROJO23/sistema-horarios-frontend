import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const API_URL = process.env.REACT_APP_API_URL;

function RegistroPage() {
  const [form, setForm] = useState({
    nombre: '',
    hora_entrada: '',
    hora_salida: '',
    fecha: '',
    clave: ''
  });
  const [consulta, setConsulta] = useState('');
  const [claveConsulta, setClaveConsulta] = useState('');
  const navigate = useNavigate();

  const entradaRef = useRef();
  const salidaRef = useRef();
  const fechaRef = useRef();
  const claveRegistroRef = useRef();
  const consultaRef = useRef();
  const claveConsultaRef = useRef();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const registrar = async () => {
    if (!form.nombre || !form.fecha || !form.clave) {
      alert('Por favor, completa nombre, fecha y contraseña');
      return;
    }

    if (form.clave !== 'vigi123') {
      alert('Contraseña incorrecta. No tienes permiso para registrar.');
      return;
    }

    await axios.post(`${API_URL}/registro`, form);
    setForm({ nombre: '', hora_entrada: '', hora_salida: '', fecha: '', clave: '' });
  };

  const consultar = () => {
    const clavesValidas = ['anastacio010', 'xiomara022', 'julio003','mariacarmen333','victor004','mariana044'];

    if (!consulta) {
      alert('Ingresa un nombre para consultar');
      return;
    }

    if (!clavesValidas.includes(claveConsulta)) {
      alert('Contraseña incorrecta para consultar. Acceso denegado.');
      return;
    }

    navigate(`/consulta?nombre=${consulta}`);
  };

  return (
    <>
      <h1 className="titulo-principal">Sistema de Horarios</h1>
      <div className="container">
        <div className="bloque-horizontal">
          <h2>Registro de Horarios</h2>
          <input
            className="input-pequeno"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, entradaRef)}
       <input
       className="input-pequeno"
       type="text"
       name="hora_entrada"
       placeholder="hh-mm (ej. 08-30 o 00-00)"
       value={form.hora_entrada}
       onChange={handleChange}
       ref={entradaRef}
       onKeyDown={(e) => handleKeyDown(e, salidaRef)}
      />

     <input
     className="input-pequeno"
     type="text"
     name="hora_salida"
     placeholder="hh-mm (ej. 17-45 o 00-00)"
     value={form.hora_salida}
     onChange={handleChange}
     ref={salidaRef}
    onKeyDown={(e) => handleKeyDown(e, fechaRef)}
   />

  <input
   className="input-pequeno"
    type="text"
    name="fecha"
    placeholder="dd-mm-aaaa (ej. 05-10-2025)"
    value={form.fecha}
    onChange={handleChange}
    ref={fechaRef}
     onKeyDown={(e) => handleKeyDown(e, claveRegistroRef)}
      />
        <input
          className="input-pequeno"
          type="password"
          name="clave"
          placeholder="Contraseña para registrar"
          value={form.clave}
          onChange={handleChange}
          ref={claveRegistroRef}
          onKeyDown={(e) => handleKeyDown(e, consultaRef)}
        />
        <div className="botones-centrados">
          <button className="btn-purpura boton-pequeno" onClick={registrar}>Registrar</button>
        </div>

        <div className="bloque-horizontal">
          <h2>Consultar Horarios</h2>
          <input
            className="input-pequeno"
            placeholder="Nombre a consultar"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            ref={consultaRef}
            onKeyDown={(e) => handleKeyDown(e, claveConsultaRef)}
          />
        </div>
        <input
          className="input-pequeno"
          type="password"
          placeholder="Contraseña para consultar"
          value={claveConsulta}
          onChange={(e) => setClaveConsulta(e.target.value)}
          ref={claveConsultaRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') consultar();
          }}
        />
        <div className="botones-centrados">
          <button className="btn-verde boton-pequeno" onClick={consultar}>Consultar</button>
        </div>
      </div>
    </>
  );
}

export default RegistroPage;
