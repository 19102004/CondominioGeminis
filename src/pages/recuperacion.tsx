import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recuperacion = () => {
  const [telefono, setTelefono] = useState("52");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("52")) {
      value = "52" + value.replace(/[^0-9]/g, "");
    }
    setTelefono(value);
  };

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:4000/api/send-whatsapp", {
        phoneNumber: telefono,
      });

      if (response.data.success) {
        alert("Código enviado con éxito. Revisa tu WhatsApp.");
        navigate("/cambioPass");
      } else {
        setError("Hubo un error al enviar el código.");
      }
    } catch (err) {
      setError("No se pudo enviar el código. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Recuperar Contraseña
        </h2>
        <label
          htmlFor="telefono"
          className="block text-lg font-medium text-gray-700"
        >
          Número de teléfono
        </label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={handleChange}
          placeholder="Ingresa tu número"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-3"
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-lg mt-4"
        >
          {loading ? "Enviando..." : "Enviar código de recuperación"}
        </button>
      </div>
    </div>
  );
};

export default Recuperacion;
