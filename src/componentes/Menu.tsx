import { NavLink, Link } from "react-router-dom";

function Menu() {
  const condominio = new URL("../assets/condominio.png", import.meta.url).href;
  const pagos = new URL("../assets/pagos.png", import.meta.url).href;
  const usuariA = new URL("../assets/usuariA.png", import.meta.url).href;
  const multa = new URL("../assets/multa.png", import.meta.url).href;
  const permisos = new URL("../assets/permisos.png", import.meta.url).href;
  const fuera = new URL("../assets/fuera.png", import.meta.url).href;
  const negocio = new URL("../assets/negocio.png", import.meta.url).href;

  return (
    <nav
      className="bg-gray-300 shadow-md p-4 w-[15%] min-h-screen flex flex-col justify-between"
      style={{ position: "fixed", left: 0, top: 0 }}
    >
      <div>
      <div className="flex flex-col items-center justify-center w-full mt-6">
  <NavLink
    to="/perfilA"
    className={({ isActive }) =>
      `flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-800"}`
    }
  >
    <img
      src={negocio}
      alt="PerfilA"
      className="object-cover w-2/5 h-auto"
    />
  </NavLink>
</div>
        <ul className="space-y-6 mt-[20%]">
          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={usuariA}
                alt="Ir a la página de usuarios"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <p className="text-sm ml-[15%]">Usuarios</p>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/pagos"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={pagos}
                alt="Ir a la página de pagos"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <p className="text-sm ml-[15%]">Pagos</p>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/multas"
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-800"
                }`
              }
            >
              <img
                src={multa}
                alt="Ir a la página de multas"
                className="w-10 h-10 object-cover hover:opacity-80 cursor-pointer transform hover:scale-110 transition-transform duration-200"
              />
              <p className="text-sm ml-[15%]">Multas</p>
            </NavLink>
          </li>

          <li className="flex items-center space-x-6 pl-[10%]">
            <NavLink
              to="/permisos"
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
              <p className="text-sm ml-[15%]">Permisos</p>
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
              <p className="text-sm ml-[25%]">Salir</p>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-6">
        <Link to="/welcome">
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
