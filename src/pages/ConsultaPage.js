import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const API_URL = process.env.REACT_APP_API_URL;

function ConsultaPage() {
  const [searchParams] = useSearchParams();
  const [resultados, setResultados] = useState([]);
  const [nombreValido, setNombreValido] = useState(true);
  const nombre = searchParams.get('nombre');

  useEffect(() => {
    const validarNombre = (nombre) => {
      const regex = /^[a-zA-Z\s]{3,}$/;
      return regex.test(nombre);
    };

    const fetchData = async () => {
      if (!validarNombre(nombre)) {
        setNombreValido(false);
        return;
      }

      setNombreValido(true);
      const res = await axios.get(`${API_URL}/consulta/${nombre}`);
      setResultados(res.data);
    };

    fetchData();
  }, [nombre]);

  const eliminar = async (id) => {
    await axios.delete(`${API_URL}/eliminar/${id}`);
    setResultados(resultados.filter((r) => r.id !== id));
  };

  return (
    <>
      <h1 className="titulo-principal">Resultados de Consulta</h1>
      <div className="container">
        {!nombreValido ? (
          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
            Nombre inválido. Por favor, escribe el nombre correctamente.
          </p>
        ) : (
          <div className="resultados-container">
            {resultados.length > 0 ? (
              <table className="resultados-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.nombre}</td>
                      <td>{r.hora_entrada}</td>
                      <td>{r.hora_salida || '—'}</td>
                      <td className="fecha">{r.fecha.slice(0, 10)}</td>
                      <td>
                        <button className="btn-naranja boton-pequeno" onClick={() => eliminar(r.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                No se encontraron registros para ese nombre.
              </p>
            )}
          </div>
        )}
        <div className="boton-regresar">
          <button className="btn-purpura boton-pequeno" onClick={() => window.location.href = '/'}>Regresar al formulario</button>
        </div>
      </div>
    </>
  );
}

export default ConsultaPage;
