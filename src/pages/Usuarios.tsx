import { useState, useEffect } from "react";
import Menu from "../componentes/Menu";

function Usuarios() {
  // const lapiz = new URL("../assets/lapiz.png", import.meta.url).href;
  // const borrar = new URL("../assets/borrar.png", import.meta.url).href;
  // const documento = new URL("../assets/documento.png", import.meta.url).href;
  // const lupa = new URL("../assets/lupa.png", import.meta.url).href;

  const [formData, setFormData] = useState({
    nombre: "",
    password: "",
    telefono: "",
    torre: "",
    departamento: "",
    tipo: "",
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("https://apigeminis.onrender.com/api/usuarios/resumen");
      if (!response.ok) {
        throw new Error("Error al obtener el resumen de usuarios");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener el resumen de usuarios:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("https://apigeminis.onrender.com/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Usuario registrado exitosamente");
        setFormData({
          nombre: "",
          password: "",
          telefono: "",
          torre: "",
          departamento: "",
          tipo: "",
        });
        fetchUsuarios(); // Recargar usuarios después de registrar uno nuevo
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };
  
interface Usuario {
  nombre: string;
  telefono: string;
  tipo: string;
  torre: string;
  departamento: string;
}

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Menu />
      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Registrar Nuevo Usuario</h1>
        </header>
        <main className="p-6">
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-bold">Nombre:</label>
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
                <label htmlFor="password" className="block text-gray-700 font-bold">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-bold">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  pattern="[0-9]*"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 p-2"
                />
              </div>
              <div>
                <label htmlFor="torre" className="block text-gray-700 font-bold">Torre:</label>
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
                <label htmlFor="departamento" className="block text-gray-700 font-bold">Departamento:</label>
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
                  {["Administrador", "Dueño", "Inquilino"].map((tipo) => (
                    <div key={tipo} className="flex items-center transform scale-90">
                      <input
                        type="radio"
                        id={tipo}
                        name="tipo"
                        value={tipo}
                        checked={formData.tipo === tipo}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <label htmlFor={tipo} className="ml-2 text-gray-700">{tipo}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#91CC04] text-black py-2 px-4 rounded-md shadow hover:bg-[#91BC04] transition duration-200 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Registrando..." : "Registrar"}
                </button>
              </div>
            </div>
          </form>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Resumen de Usuarios</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Nombre</th>
                  <th className="border border-gray-300 p-2">Teléfono</th>
                  <th className="border border-gray-300 p-2">Tipo</th>
                  <th className="border border-gray-300 p-2">Torre</th>
                  <th className="border border-gray-300 p-2">Departamento</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((usuario, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{usuario.nombre}</td>
                      <td className="border border-gray-300 p-2">{usuario.telefono}</td>
                      <td className="border border-gray-300 p-2">{usuario.tipo}</td>
                      <td className="border border-gray-300 p-2">{usuario.torre}</td>
                      <td className="border border-gray-300 p-2">{usuario.departamento}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No hay usuarios registrados
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

export default Usuarios;
