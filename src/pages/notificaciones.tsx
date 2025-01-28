import { useState, useEffect } from "react";
import MenuU from "../componentes/MenuU";
import borrarImg from "../assets/borrar.png"; 

interface Multa {
  _id: string; 
  nombre: string;
  concepto: string;
  fecha: string;
}

function Notificaciones() {
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
        `http://localhost:4000/api/notificaciones/resumen?departamento=${departamento}`
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
      const response = await fetch(`http://localhost:4000/api/notificaciones/delete/${id}`, {
        method: "DELETE",
      });

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
    <div className="min-h-screen bg-gray-100 flex">
      <MenuU />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Notificaciones</h1>
        </header>
        <main className="p-6">
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Resumen de Multas</h2>
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
          </section>
        </main>
      </div>
    </div>
  );
}

export default Notificaciones;
