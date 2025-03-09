import { useEffect } from "react";

const Sesiones = () => {
  const idUsuario = localStorage.getItem("idUsuario");

  const checkTokens = async () => {
    if (!idUsuario) return;

    try {
      const response = await fetch(`https://apigeminis.onrender.com/api/usuarios/verificar-tokens/${idUsuario}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (response.status === 404 && data.message === "No hay tokens asociados al usuario") {
        console.log("No hay tokens asociados al usuario, cerrando sesión...");
        
        alert("Su sesión ha expirado. Será redirigido a la página de inicio de sesión.");

        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "https://condominio-geminis.vercel.app/"; 
      }
    } catch (error) {
      console.error("Error verificando tokens:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokens, 5000);

    return () => clearInterval(interval);
  }, [idUsuario]);

  return null;

};

export default Sesiones;
