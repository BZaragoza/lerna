import React, { useEffect, useMemo, useState } from 'react'

import CardEditDeleteDropdown from 'components/Dropdowns/CardEditDeleteDropdown'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import Table from 'components/Table/Table'



function CardStatus(  color='light' ) {

  const location = useLocation();

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = () => {
    fetch("/status")
      .then(res => res.json())
      .then(({ res }) => setStatuses(res))
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Estado',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Color',
        accessor: 'col2',
      },
      {
        Header: 'Editar',
        accessor: 'col3',
      },
    ],
    []
  );

  const data = useMemo(
    () => (
      statuses.map(status => ({
        col1: status.status,
        col2: <div className={status.color} style={{ border: '1px solid #aaa', width: '50px', height: '20px', }}></div>,
        col3: <CardEditDeleteDropdown
          path={`/admin/status-new/${status.id}?last_url=${location.pathname}`}
          id={status.id}
          table="status"
          fetchFunction={fetchStatus}
        />
      }))
    ), [statuses, location.pathname]
  )

  return (
    <Table columns={columns} data={data}>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color !== "light" ? "text-gray-800" : "text-white")
                  }
                >
                  Estados
                </h3>
                <Link to={`/admin/status-new?last_url=${location.pathname}`}>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Nuevo Estado
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </Table>
  )
}

export default CardStatus
