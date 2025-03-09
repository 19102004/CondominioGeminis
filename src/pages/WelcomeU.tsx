import MenuU from "../componentes/MenuU";
import Sesiones from "../middlewares/Sesiones";

function WelcomeU() {
  // const fondo = new URL("../assets/fondo.png", import.meta.url).href;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <MenuU />
      <Sesiones />


      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Bienvenido Usuario Común</h1>
        </header>
        <main className="bg-white shadow-md rounded-md p-6">
          <p className="text-gray-700">
            Mira caon, picale a una pero bien, no seas mamón.
          </p>
          {/* <img
            src={fondo}
            alt="Fondo"
            className="w-5/12 h-auto mt-6 rounded-md shadow-md"
          /> */}
        </main>
      </div>
    </div>
  );
}

export default WelcomeU;
