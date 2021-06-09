import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// components

import CardBrandsModelsDropdown from "components/Dropdowns/CardBrandsModelsDropdown.js";

export default function CardModels({ color }) {

  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = () => {
    fetch("/modelos")
      .then(res => res.json())
      .then(({ res }) => setModels(res))
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
                  Modelos
              </h3>
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <Link to="/admin/model-new">Nuevo Modelo</Link>
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
                  Marca
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Modelo
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  M Numerico
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
                models.map(model => {
                  return (
                    <tr key={model.id}>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4">
                        {model.marca}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-normal p-4">
                        {model.modelo}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-normal p-4">
                        {model.modelo_num}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4 text-center">
                        <CardBrandsModelsDropdown path="model-new" id={model.id} fetchAgain={fetchModels} table={"modelos"}/>
                      </td>
                    </tr>
                  )
                })

              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardModels.defaultProps = {
  color: "light",
};

CardModels.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
