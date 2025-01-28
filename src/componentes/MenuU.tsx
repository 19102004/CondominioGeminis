import { NavLink, Link } from "react-router-dom";

function Menu() {
  const condominio = new URL("../assets/condominio.png", import.meta.url).href;
  const permisos = new URL("../assets/permisos.png", import.meta.url).href;
  const fuera = new URL("../assets/fuera.png", import.meta.url).href;
  const usuario = new URL("../assets/usuario.png", import.meta.url).href;
  const historial = new URL("../assets/historial.png", import.meta.url).href;
  const notificacion = new URL("../assets/notificacion.png", import.meta.url).href;


  return (
    <nav
      className="bg-gray-300 shadow-md p-4 w-[15%] min-h-screen flex flex-col justify-between"
      style={{ position: "fixed", left: 0, top: 0 }}
    >
      <div>
        <div className="flex flex-col items-center justify-center w-full mt-6">
          <img
            src={usuario}
            alt="Perfil"
            className="object-cover w-2/5 h-auto"
          />
        </div>
        <ul className="space-y-6 mt-[20%]">


          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={historial}
                alt="Ir a la página de historial"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Hisotrial</span>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/solipermisos"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={permisos}
                alt="Ir a la página de permisos"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Permisos</span>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/notificaciones"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={notificacion}
                alt="Ir a la página de notificaciones"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[15%]">Notificaciones</span>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={fuera}
                alt="Salir"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm ml-[25%]">Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-6">
        <Link to="/welcomeu">
          <img
            src={condominio}
            alt="Inicio"
            className="w-28 h-auto object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Menu;
