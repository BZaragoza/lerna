import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from 'react-router-dom';

// components
import CardEditDeleteDropdown from "components/Dropdowns/CardEditDeleteDropdown";
import Table from "components/Table/Table";

export default function CardModels({ color="light" }) {

  const [models, setModels] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = () => {
    fetch("/modelos")
      .then(res => res.json())
      .then(({ res }) => setModels(res))
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Marca',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Modelo',
        accessor: 'col2', // accessor is the "key" in the data
      },
      {
        Header: 'Modelo Num',
        accessor: 'col3', // accessor is the "key" in the data
      },
      {
        Header: 'Editar',
        accessor: 'col4',
        disableFilters: true,
      },
    ], []);

  const data = useMemo(() => {

    const modelsFiltered = models.map(({ id, marca, modelo, modelo_num }) => ({
      col1: marca,
      col2: modelo,
      col3: modelo_num,
      col4: <CardEditDeleteDropdown
        path={`/admin/model-new/${id}?last_url=${location.pathname}`}
        id={ id }
        table="marcas"
        fetchFunction={ fetchModels }
      />
    }))

    return modelsFiltered
  }, [ models, location.pathname ])

  return (
    <Table columns={columns} data={data}>
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
                <Link to={`/admin/model-new?last_url=${location.pathname}`}>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Nuevo Modelo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </Table>
  );
};