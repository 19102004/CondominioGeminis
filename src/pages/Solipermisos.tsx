import React, { useState } from "react";
import MenuU from "../componentes/MenuU";

function Solipermisos() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    torre: "",
    departamento: "",
    fecha: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Datos registrados:\n${JSON.stringify(formData, null, 2)}`);
    setFormData({
      nombre: "",
      telefono: "",
      torre: "",
      departamento: "",
      fecha: "",
      descripcion: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MenuU />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center ">Solicitar permiso</h1>
        </header>
        <main className=" p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
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
  <label className="block text-gray-700 font-bold mb-2">Fecha:</label>
  <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
                <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
  <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />

</div>


              <div>
                <button
                  type="submit"
                  className="bg-[#91CC04] text-back py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Solipermisos;
