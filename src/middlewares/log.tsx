export const handleLogin = async (
    telefono: string,
    password: string,
    recordar: boolean,
    setErrorMessage: (msg: string) => void,
    navigate: (path: string) => void
  ) => {
    if (!telefono || !password) {
      setErrorMessage("Por favor, ingresa ambos campos.");
      return;
    }
  
    const telefonoConPrefijo = `52${telefono}`;
  
    try {
      const response = await fetch(
        `https://apigeminis.onrender.com/api/usuarios/existe?telefono=${telefonoConPrefijo}&password=${password}&recordar=${recordar ? "true" : "false"}`
      );
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("token", data.tokenTemporal);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("idUsuario", data.usuario.id);
        localStorage.setItem("departamento", data.usuario.departamento);
  
        if (data.tokenPermanente) {
          localStorage.setItem("tokenPermanente", data.tokenPermanente);
        }
  
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
      setErrorMessage("Hubo un problema al iniciar sesión. Intenta otra vez.");
    }
  };
  