import { useEffect, useState } from "react";
import MenuU from "../componentes/MenuU";
import Sesiones from "../middlewares/Sesiones";

function Perfil() {

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editUsuario, setEditUsuario] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    password: "",
    telefono: "",
  });
  const [showModal, setShowModal] = useState(false); 

  const idUsuario = localStorage.getItem("idUsuario"); 
  
  

  useEffect(() => {
    if (!idUsuario) {
      setError("No se encontró el idUsuario en el almacenamiento local.");
      return;
    }

    fetch(`https://apigeminis.onrender.com/api/usuarios/perfil/${idUsuario}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((err) => {
        setError(`Hubo un error al cargar los usuarios: ${err.message}`);
      });
  }, [idUsuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (usuario: any) => {
    setEditUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      password: usuario.password,
      telefono: usuario.telefono,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUsuario) return;

    fetch(`https://apigeminis.onrender.com/api/usuarios/edit/${editUsuario._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUsuarios(
          usuarios.map((usuario) =>
            usuario._id === updatedUser._id ? updatedUser : usuario
          )
        );
        setEditUsuario(null);
        setFormData({
          nombre: "",
          password: "",
          telefono: "",
        });
        setShowModal(false); 
      })
      .catch((err) => {
        setError(`Hubo un error al guardar los cambios: ${err.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MenuU />
      <Sesiones />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Bienvenido Usuario Común</h1>
        </header>
        <main className="bg-white shadow-md rounded-md p-6">
          {error && <p className="text-red-500">{error}</p>}

          <table className="min-w-full bg-white shadow-md rounded-md mb-6">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Contraseña</th>
                <th className="py-3 px-6 text-left">Teléfono</th>
                <th className="py-3 px-6 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario: any, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6">{usuario.nombre}</td>
                    <td className="py-3 px-6">{usuario.password}</td>
                    <td className="py-3 px-6">{usuario.telefono}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="text-blue-500 hover:underline"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                    No hay usuarios disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {editUsuario && (
            <div className="bg-white p-6 shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowModal(true); 
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Confirmar Cambio de Contraseña</h2>
            <p className="text-gray-700 mb-4">
              Al cambiar la contraseña, se cerrará la sesión en todos los dispositivos incluido este.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;
