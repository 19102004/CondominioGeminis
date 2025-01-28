import { useState } from "react";
import Menu from "../componentes/Menu";

function Pagos() {
  const lupa = new URL("../assets/lupa.png", import.meta.url).href;
  const lapiz = new URL("../assets/lapiz.png", import.meta.url).href;
  const borrar = new URL("../assets/borrar.png", import.meta.url).href;
  const documento = new URL("../assets/documento.png", import.meta.url).href;

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    torre: "",
    departamento: "",
    monto: "",
    fecha: "",
    concepto: "",
  });

  const [payments, setPayments] = useState([
    { id: 1, nombre: "Juan Pérez", telefono: "1234567890", torre: "Torre A", departamento: "101", monto: "500", concepto: "Mantenimiento" },
    { id: 2, nombre: "Ana López", telefono: "9876543210", torre: "Torre B", departamento: "202", monto: "300", concepto: "Luz" },
    { id: 3, nombre: "Luis Martínez", telefono: "5678901234", torre: "Torre C", departamento: "303", monto: "400", concepto: "Agua" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPayments([
      ...payments,
      {
        id: payments.length + 1,
        ...formData,
      },
    ]);
    alert(`Datos registrados:\n${JSON.stringify(formData, null, 2)}`);
    setFormData({
      nombre: "",
      telefono: "",
      torre: "",
      departamento: "",
      monto: "",
      fecha: "",
      concepto: "",
    });
  };
  

  const handleDelete = (id: number) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  

  const filteredPayments = payments.filter(
    (payment) =>
      payment.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.telefono.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Menu />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Registrar Nuevo Pago</h1>
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
                <label htmlFor="departamento" className="block text-gray-700 font-bold">Fecha:</label>
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
              
              <button
                type="submit"
                className="bg-[#91CC04] text-black py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full"
              >
                Registrar
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Pagos Registrados</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Buscar por nombre o teléfono"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 p-2 border rounded-md shadow-sm bg-gray-200"
              />
              <img src={lupa} alt="Buscar" className="w-6 h-6 ml-2" />
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Nombre</th>
                  <th className="py-2 px-4 border-b text-left">Teléfono</th>
                  <th className="py-2 px-4 border-b text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="py-2 px-4 border-b">{payment.nombre}</td>
                    <td className="py-2 px-4 border-b">{payment.telefono}</td>
                    <td className="py-2 px-4 border-b text-center space-x-4">
                      <button>
                        <img src={documento} alt="Ver" className="inline-block w-5 h-5" />
                      </button>
                      <button>
                        <img src={lapiz} alt="Editar" className="inline-block w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(payment.id)}>
                        <img src={borrar} alt="Eliminar" className="inline-block w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Pagos;
