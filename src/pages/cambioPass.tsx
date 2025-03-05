import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CambioPass = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/checartoken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Token inválido o expirado.");
        setIsValidToken(true);
        alert("Token válido. Puedes restablecer tu contraseña.");
      } catch (error) {
        alert("Error al verificar el token.");
      } finally {
        setIsLoading(false);
      }
    };
    if (token) verifyToken();
  }, [token]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://api-celeste.onrender.com/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al actualizar la contraseña.");
      alert("Contraseña actualizada correctamente.");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      alert("Error al actualizar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Cambiar Contraseña</h2>
        {isLoading ? (
          <p className="text-center">Cargando...</p>
        ) : isValidToken ? (
          <>
            <label className="block text-lg font-medium text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-3"
            />

            <label className="block text-lg font-medium text-gray-700 mt-4">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-3"
            />

            <button
              onClick={handleChangePassword}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Cambiar Contraseña
            </button>
          </>
        ) : (
          <p className="text-center text-red-500">Token inválido o expirado.</p>
        )}
      </div>
    </div>
  );
};

export default CambioPass;
