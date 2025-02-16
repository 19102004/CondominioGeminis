import { useState, useEffect } from "react";
import Menu from "../componentes/Menu";
import Modal from "../componentes/modal_multa";

interface Multa {
  nombre: string;
  telefono: string;
  torre: string;
  departamento: string;
  monto: number;
  fecha: string;
  concepto: string;
}

function Multas() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    torre: "",
    departamento: "",
    monto: 0,
    fecha: "",
    concepto: "",
  });

  const [multas, setMultas] = useState<Multa[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchMultas();
  }, []);
 
  const fetchMultas = async () => {
    try {
      const response = await fetch("https://apigeminis.onrender.com/api/multas/resumen", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
    setFormData({
      ...formData,
      [name]: name === "monto" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // http://localhost:4000
    setTimeout(async () => {
      try {
        const multaResponse = await fetch("https://apigeminis.onrender.com/api/multas", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!multaResponse.ok) {
          throw new Error("Error al registrar la multa verifique su token.");
        }

        const notificacionData = {
          mensaje: `Se ha registrado una multa para ${formData.nombre}`,
          ...formData,
        };
        
        const notificacionResponse = await fetch("https://apigeminis.onrender.com/api/notificaciones", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificacionData),
        });

        if (!notificacionResponse.ok) {
          throw new Error("Error al registrar la notificación.");
        }

        setFormData({
          nombre: "",
          telefono: "",
          torre: "",
          departamento: "",
          monto: 0,
          fecha: "",
          concepto: "",
        });

        fetchMultas();
      } catch (error) {
        console.error("Error al registrar la multa o la notificación:", error);
        alert("Hubo un error al registrar la multa o la notificación.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
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
              {[
                { label: "Nombre", name: "nombre", type: "text" },
                { label: "Teléfono", name: "telefono", type: "number" },
                { label: "Torre", name: "torre", type: "text" },
                { label: "Fecha", name: "fecha", type: "date" },
              ].map(({ label, name, type }) => (
                <label key={name} className="block text-gray-700 font-bold">{label}:
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof typeof formData] as string}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                  />
                </label>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { label: "Departamento", name: "departamento", type: "text" },
                { label: "Monto", name: "monto", type: "number" },
                { label: "Concepto", name: "concepto", type: "text" },
              ].map(({ label, name, type }) => (
                <label key={name} className="block text-gray-700 font-bold">{label}:
                  <input
                    type={type}
                    name={name}
                    value={name === "monto" ? formData.monto.toString() : formData[name as keyof typeof formData] as string}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                  />
                </label>
              ))}
              <button type="submit" className="bg-[#91CC04] text-black py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full">
                Registrar
              </button>
            </div>
          </form>

          {/* Sección para mostrar las multas */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Multas</h2>
            <ul className="space-y-2">
              {multas.map((multa, index) => (
                <li key={index} className="border p-4 rounded-md bg-white shadow">
                  <p><strong>Nombre:</strong> {multa.nombre}</p>
                  <p><strong>Teléfono:</strong> {multa.telefono}</p>
                  <p><strong>Torre:</strong> {multa.torre}</p>
                  <p><strong>Departamento:</strong> {multa.departamento}</p>
                  <p><strong>Monto:</strong> {multa.monto}</p>
                  <p><strong>Fecha:</strong> {multa.fecha}</p>
                  <p><strong>Concepto:</strong> {multa.concepto}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Modal isOpen={isSubmitting} onClose={() => {}} isSubmitting={isSubmitting}>
        <p className="text-lg text-center">Guardado...</p>
      </Modal>
    </div>
  );
}

export default Multas;
