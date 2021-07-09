import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CardEditDeleteDropdown from "components/Dropdowns/CardEditDeleteDropdown";

// components


export default function CardTechnicals({ color }) {

  const [technicians, setTechnicians] = useState([]);
  useEffect(() => {
    fetchTechnicians()
  }, [])

  const fetchTechnicians = () => {
    fetch("/technician")
      .then(res => res.json())
      .then(({ res }) => setTechnicians(res))
  }

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-gray-800" : "text-white")
                  }
                >
                  Tecnicos
                </h3>
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <Link to="/admin/technical-new">Nuevo Tecnico</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Nombre
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Foto
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {
                technicians.map(({ id, name, }) => (
                  <tr key={ id }>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4">
                      { name }
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <div className="flex justify-center">
                        <img
                          src={require("assets/img/daniel.jpg")}
                          alt="..."
                          className="w-10 h-10 rounded-full border-2 border-gray-100 shadow"
                        ></img>
                      </div>
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4 text-center">
                      <CardEditDeleteDropdown 
                        id={ id }
                        path={ `/admin/technical-new/${ id }` }
                        table="technician"
                        fetchFunction={ fetchTechnicians }
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTechnicals.defaultProps = {
  color: "light",
};

CardTechnicals.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
