import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import borrarImg from "../assets/borrar.png";
import "./modal.css"; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface Multa {
  _id: string;
  nombre: string;
  concepto: string;
  fecha: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [multas, setMultas] = useState<Multa[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const departamento = localStorage.getItem("departamento");

    if (departamento) {
      const intervalId = setInterval(() => {
        fetchMultasPorDepartamento(departamento);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setError("No se encontró un departamento en localStorage");
    }
  }, []);

  const fetchMultasPorDepartamento = async (departamento: string) => {
    try {
      const response = await fetch(
        `https://apigeminis.onrender.com/api/notificaciones/resumen?departamento=${departamento}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener el resumen de multas");
      }

      const data = await response.json();
      setMultas(data.notificaciones);
    } catch (error) {
      setError("Error al obtener el resumen de multas");
      console.error("Error al obtener el resumen de multas:", error);
    }
  };

  const eliminarNotificacion = async (id: string) => {
    try {
      const response = await fetch(
        `https://apigeminis.onrender.com/api/notificaciones/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      setMultas((prevMultas) => prevMultas.filter((multa) => multa._id !== id));
    } catch (error) {
      setError("Error al eliminar la notificación");
      console.error("Error al eliminar la notificación:", error);
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="modal"
      unmountOnExit
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
          <header className="bg-blue-500 text-white py-4 px-6 mb-6">
            <h1 className="text-3xl font-bold text-center">Notificaciones</h1>
          </header>

          {error && <p className="text-red-500">{error}</p>}

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Concepto</th>
                <th className="border border-gray-300 p-2">Fecha</th>
                <th className="border border-gray-300 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {multas.length > 0 ? (
                multas.map((multa) => (
                  <tr key={multa._id} className="bg-white hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{multa.nombre}</td>
                    <td className="border border-gray-300 p-2">{multa.concepto}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(multa.fecha).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => eliminarNotificacion(multa._id)}
                        className="flex items-center justify-center"
                      >
                        <img src={borrarImg} alt="Eliminar" className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No hay multas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

const MenuU = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificacionesCount, setNotificacionesCount] = useState(0);
  const condominio = new URL("../assets/condominio.png", import.meta.url).href;
  const permisos = new URL("../assets/permisos.png", import.meta.url).href;
  const fuera = new URL("../assets/fuera.png", import.meta.url).href;
  const usuario = new URL("../assets/usuario.png", import.meta.url).href;
  const historial = new URL("../assets/historial.png", import.meta.url).href;
  const notificacion = new URL("../assets/notificacion.png", import.meta.url).href;

  useEffect(() => {
    const departamento = localStorage.getItem("departamento");

    if (departamento) {
      const intervalId = setInterval(() => {
        fetchNotificacionesCount(departamento);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const fetchNotificacionesCount = async (departamento: string) => {
    try {
      const response = await fetch(
        `https://apigeminis.onrender.com/api/notificaciones/resumen?departamento=${departamento}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener el conteo de notificaciones");
      }

      const data = await response.json();
      setNotificacionesCount(data.notificaciones.length);
    } catch (error) {
      console.error("Error al obtener el conteo de notificaciones:", error);
    }
  };

  return (
    <nav className="bg-gray-300 shadow-md p-4 w-[15%] min-h-screen flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="flex flex-col items-center justify-center w-full mt-6">
          <img
            src={usuario}
            alt="Perfil"
            className="object-cover w-2/5 h-auto"
          />
        </div>

        <ul className="space-y-6 mt-[20%]">
          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                `flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-800"}`
              }
            >
              <img
                src={historial}
                alt="Ir a la página de historial"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Historial</span>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/solipermisos"
              className={({ isActive }) =>
                `flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-800"}`
              }
            >
              <img
                src={permisos}
                alt="Ir a la página de permisos"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Permisos</span>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%] relative">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-gray-800"
            >
              <img
                src={notificacion}
                alt="Ir a la página de notificaciones"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Notificaciones</span>
            </button>
            {/* Contador de notificaciones */}
            {notificacionesCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {notificacionesCount}
              </span>
            )}
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-800"}`
              }
            >
              <img
                src={fuera}
                alt="Salir"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[25%]">Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-6">
        <Link to="/welcomeu">
          <img
            src={condominio}
            alt="Inicio"
            className="w-28 h-auto object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Aquí se incluye el modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default MenuU;
