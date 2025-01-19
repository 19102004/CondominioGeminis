import React, { useState } from "react";
import Menu from "../componentes/Menu";

function Usuarios() {
  const lapiz = new URL("../assets/lapiz.png", import.meta.url).href;
  const borrar = new URL("../assets/borrar.png", import.meta.url).href;
  const documento = new URL("../assets/documento.png", import.meta.url).href;
  const lupa = new URL("../assets/lupa.png", import.meta.url).href;

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    torre: "",
    departamento: "",
    tipo: "",
  });

  const [users, setUsers] = useState([
    { id: 1, nombre: "Juan Pérez", telefono: "1234567890", torre: "Torre A", departamento: "101", tipo: "Residente" },
    { id: 2, nombre: "Ana López", telefono: "9876543210", torre: "Torre B", departamento: "202", tipo: "Visitante" },
    { id: 3, nombre: "Luis Martínez", telefono: "5678901234", torre: "Torre C", departamento: "303", tipo: "Empleado" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: users.length + 1,
        nombre: formData.nombre,
        telefono: formData.telefono,
        torre: formData.torre,
        departamento: formData.departamento,
        tipo: formData.tipo,
      },
    ]);
    alert(`Datos registrados:\n${JSON.stringify(formData, null, 2)}`);
    setFormData({
      nombre: "",
      telefono: "",
      torre: "",
      departamento: "",
      tipo: "",
    });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.telefono.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Menu />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Registrar Nuevo Usuario</h1>
        </header>
        <main className="p-6">
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
  <label className="block text-gray-700 font-bold mb-2">Tipo:</label>
  <div className="flex space-x-8 justify-center mt-2">
    <div className="flex items-center transform scale-90">
      <input
        type="radio"
        id="administrador"
        name="tipo"
        value="Administrador"
        checked={formData.tipo === "Administrador"}
        onChange={handleChange}
        className="form-radio text-blue-500"
      />
      <label htmlFor="administrador" className="ml-2 text-gray-700">Administrador</label>
    </div>
    <div className="flex items-center transform scale-90">
      <input
        type="radio"
        id="dueno"
        name="tipo"
        value="Dueño"
        checked={formData.tipo === "Dueño"}
        onChange={handleChange}
        className="form-radio text-blue-500"
      />
      <label htmlFor="dueno" className="ml-2 text-gray-700">Dueño</label>
    </div>
    <div className="flex items-center transform scale-90">
      <input
        type="radio"
        id="inquilino"
        name="tipo"
        value="Inquilino"
        checked={formData.tipo === "Inquilino"}
        onChange={handleChange}
        className="form-radio text-blue-500"
      />
      <label htmlFor="inquilino" className="ml-2 text-gray-700">Inquilino</label>
    </div>
  </div>
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

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Usuarios Registrados</h2>

            {/* Search Input */}
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
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.nombre}</td>
                    <td className="py-2 px-4 border-b">{user.telefono}</td>
                    <td className="py-2 px-4 border-b text-center space-x-4">
                      <button>
                        <img src={documento} alt="Ver" className="inline-block w-5 h-5" />
                      </button>
                      <button>
                        <img src={lapiz} alt="Editar" className="inline-block w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(user.id)}>
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

export default Usuarios;
