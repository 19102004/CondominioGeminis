import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const navigate = useNavigate(); 
  const condominio = new URL("../assets/condominio.png", import.meta.url).href;

  const [telefono, setTelefono] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    if (!telefono || !password) {
      setErrorMessage("Por favor, ingresa ambos campos.");
      return;
    }
    
    try {
      const response = await fetch(
        `https://apigeminis.onrender.com/api/usuarios/existe?telefono=${telefono}&password=${password}`
      );
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("usuario", JSON.stringify(data.usuario)); 
        localStorage.setItem("idUsuario", data.usuario.id); 
        localStorage.setItem("departamento", data.usuario.departamento); 
        if (data.usuario.tipo === "Inquilino") {
          navigate("/welcomeU");
        } else {
          navigate("/welcome");
        }
      } else {
        setErrorMessage(data.mensaje || "Error desconocido.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setErrorMessage("Hubo un problema al iniciar sesión. Intenta nuevamente.");
    }
  };
  
  
  
  

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute w-80 h-80 bg-[#00B6BD] rounded-full"
        style={{
          top: "-8rem",
          left: "-8rem",
        }}
      ></div>
      <div
        className="absolute w-40 h-40 bg-[#00B6BD] rounded-full"
        style={{
          top: "2rem",
          left: "8rem",
        }}
      ></div>

      <div className="flex w-full max-w-5xl items-center">
        <div className="w-1/2">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">Iniciar sesión</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="telefono" className="block text-lg font-medium text-gray-700">
                  Número de teléfono
                </label>
                <input
                  type="number"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ingresa tu número"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3"
                />
              </div>

              {/* Si hay un mensaje de error, lo mostramos aquí */}
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-lg"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
        <div className="w-[15%]" />
        <div className="w-1/2">
          <img src={condominio} alt="Condominio" className="object-cover w-full h-auto" />
          <p className="text-center text-3xl text-[#00B6BD] font-semibold">Géminis</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
