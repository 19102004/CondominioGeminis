import { useState, useEffect } from "react";
import Menu from "../componentes/Menu";
import Modal from "../componentes/modal_multa"; // Asegúrate de importar el modal correctamente

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
    monto: "",
    fecha: "",
    concepto: "",
  });

  const [multas, setMultas] = useState<Multa[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    setTimeout(async () => {
      try {
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

        setFormData({
          nombre: "",
          telefono: "",
          torre: "",
          departamento: "",
          monto: "",
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
              <label className="block text-gray-700 font-bold">Nombre:
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <label className="block text-gray-700 font-bold">Teléfono:
                <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <label className="block text-gray-700 font-bold">Torre:
                <input type="text" name="torre" value={formData.torre} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <label className="block text-gray-700 font-bold">Fecha:
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
            </div>
            <div className="space-y-4">
              <label className="block text-gray-700 font-bold">Departamento:
                <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <label className="block text-gray-700 font-bold">Monto:
                <input type="number" name="monto" value={formData.monto} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <label className="block text-gray-700 font-bold">Concepto:
                <input type="text" name="concepto" value={formData.concepto} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2" />
              </label>
              <button type="submit" className="bg-[#91CC04] text-black py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full">
                Registrar
              </button>
            </div>
          </form>
        </main>
      </div>
      <Modal isOpen={isSubmitting} onClose={() => {}} isSubmitting={isSubmitting}>
        <p className="text-lg text-center">Guardado...</p>
      </Modal>
    </div>
  );
}

export default Multas;
