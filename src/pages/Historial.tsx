import React, { useState } from "react";
import MenuU from "../componentes/MenuU";

function Historial() {
  const [searchQuery, setSearchQuery] = useState("");

  const documento = new URL("../assets/documento.png", import.meta.url).href;
  const lupa = new URL("../assets/lupa.png", import.meta.url).href;

  const historialData = [
    { tipo: "Multa", fecha: "2025-01-01", id: 1 },
    { tipo: "Pago", fecha: "2025-01-02", id: 2 },
    { tipo: "Permiso", fecha: "2025-01-03", id: 3 },
    { tipo: "Multa", fecha: "2025-01-04", id: 4 },
    { tipo: "Pago", fecha: "2025-01-05", id: 5 },
    { tipo: "Permiso", fecha: "2025-01-06", id: 6 },
  ];

  const filteredData = historialData.filter(
    (item) =>
      item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fecha.includes(searchQuery)
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MenuU />

      <div className="ml-[15%] flex-1 p-6">
        <header className="bg-blue-500 text-white py-4 px-6 mb-6">
          <h1 className="text-3xl font-bold text-center">Historial</h1>
        </header>

        <main className="bg-white shadow-md rounded-md p-6">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Buscar por tipo o fecha"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 p-2 border rounded-md shadow-sm bg-gray-200"
            />
            <img src={lupa} alt="Buscar" className="w-6 h-6 ml-2" />
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Tipo</th>
                <th className="py-2 px-4 text-left">Fecha</th>
                <th className="py-2 px-4 text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">{item.tipo}</td>
                  <td className="py-2 px-4">{item.fecha}</td>
                  <td className="py-2 px-4">
                    <img
                      src={documento}
                      alt="Documento"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default Historial;
