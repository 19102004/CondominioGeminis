import { useState, useEffect } from "react";
import Menu from "../componentes/Menu";

interface Multa {
  nombre: string;
  telefono: string;
  torre: string;
  departamento: string;
  monto: number;
  fecha: string; // or Date
  concepto: string;
}

function Multas() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    torre: "",
    departamento: "",
    monto: "",
    fecha: "",
    concepto: "",
  });

  const [multas, setMultas] = useState<Multa[]>([]);

  useEffect(() => {
    fetchMultas();
  }, []);

  const fetchMultas = async () => {
    try {
      const response = await fetch("https://apigeminis.onrender.com/api/multas/resumen");
      if (!response.ok) {
        throw new Error("Error al obtener el resumen de multas");
      }
      const data = await response.json();
      setMultas(data);
    } catch (error) {
      console.error("Error al obtener el resumen de multas:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Realizar la solicitud para registrar la multa
    const multaResponse = await fetch("https://apigeminis.onrender.com/api/multas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!multaResponse.ok) {
      throw new Error("Error al registrar la multa.");
    }

    // Crear datos para la notificación
    const notificacionData = {
      mensaje: `Se ha registrado una multa para ${formData.nombre}`,
      fecha: formData.fecha,
      departamento: formData.departamento,
      telefono: formData.telefono,
      torre: formData.torre,
      concepto: formData.concepto,
      monto: formData.monto,
      nombre: formData.nombre,

    };

    // Realizar la solicitud para registrar la notificación
    const notificacionResponse = await fetch("https://apigeminis.onrender.com/api/notificaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificacionData),
    });

    if (!notificacionResponse.ok) {
      throw new Error("Error al registrar la notificación.");
    }

    alert("Multa y notificación registradas exitosamente!");
    setFormData({
      nombre: "",
      telefono: "",
      torre: "",
      departamento: "",
      monto: "",
      fecha: "",
      concepto: "",
    });

    fetchMultas(); // Recargar multas después de registrar una nueva
  } catch (error) {
    console.error("Error al registrar la multa o la notificación:", error);
    alert("Hubo un error al registrar la multa o la notificación.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Menu />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Registrar Nueva Multa</h1>
        </header>
        <main className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-bold">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-bold">
                  Teléfono:
                </label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="torre" className="block text-gray-700 font-bold">
                  Torre:
                </label>
                <input
                  type="text"
                  id="torre"
                  name="torre"
                  value={formData.torre}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="fecha" className="block text-gray-700 font-bold">
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="departamento" className="block text-gray-700 font-bold">
                  Departamento:
                </label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="monto" className="block text-gray-700 font-bold">
                  Monto:
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={formData.monto}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="concepto" className="block text-gray-700 font-bold">
                  Concepto:
                </label>
                <input
                  type="text"
                  id="concepto"
                  name="concepto"
                  value={formData.concepto}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#91CC04] text-black py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Resumen de Multas</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Nombre</th>
                  <th className="border border-gray-300 p-2">Concepto</th>
                  <th className="border border-gray-300 p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {multas.length > 0 ? (
                  multas.map((multa, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{multa.nombre}</td>
                      <td className="border border-gray-300 p-2">{multa.concepto}</td>
                      <td className="border border-gray-300 p-2">{new Date(multa.fecha).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
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

export default Multas;
