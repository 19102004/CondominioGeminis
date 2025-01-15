import React from "react";
import MenuU from "../componentes/MenuU";

function Historial() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MenuU />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold">Bienvenido a hisotrial</h1>
        </header>
        <main className="bg-white shadow-md rounded-md p-6">
          <p className="text-gray-700">
            Mira caon, picale a una pero bien, no seas mamón.
          </p>
        </main>
      </div>
    </div>
   
  );
}

export default Historial;
