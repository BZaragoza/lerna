import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { DateTime } from 'luxon';

import CardOrdersDropdown from "components/Dropdowns/CardOrdersDropdown.js";
import NotificationDropdown from 'components/Dropdowns/NotificationDropdown'

// components
import CardModal from "components/Cards/CardModal.js";
import { useTable } from "react-table";

export default function CardOrdersLite({ color="light" })  {

  const [index, setIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    fetchOrders()
  }, []);

  const fetchOrders = () => {
    fetch("/orden")
      .then(res => res.json())
      .then(({ res }) => setOrders(res))
  }

  const toggleModal = () => {
    setShowModal(true)
  }

  const stopProp = (e) => e.stopPropagation()

  const columns = useMemo(
    () => [
      {
        Header: 'Fecha Entrada',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Folio',
        accessor: 'col2',
      },
      {
        Header: 'Estado',
        accessor: 'col3',
      },
      {
        Header: 'Cliente',
        accessor: 'col4',
      },
      {
        Header: 'Equipo',
        accessor: 'col5',
      },
      {
        Header: 'Falla',
        accessor: 'col6',
      },
      {
        Header: 'Precio',
        accessor: 'col7',
      },
      {
        Header: 'Fecha Entrega',
        accessor: 'col8',
      },
      {
        Header: 'Tecnico',
        accessor: 'col9',
      },
      {
        Header: 'Editar',
        accessor: 'col10',
        onClick: stopProp,
        Cell: (props) => {
          return <div onClick={ stopProp }>{props.cell.value}</div>;
        }
      },
    ], []);



  const data = useMemo(() => {

    const ordersFiltered = orders.map(({ id, receptionDate, folio, status, color, nombre,
      apellido_paterno, apellido_materno, device, falla, price, deadlineDate, 
    }) => (

      {
        col1: DateTime.fromMillis(receptionDate).toLocaleString(DateTime.DATETIME_MED),
        col2: folio,
        col3: <div onClick={ stopProp }>
                <NotificationDropdown fetchOrders={ fetchOrders } orderId={ id } >
                  <span className={ color + " text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1"} >
                    { status }
                  </span>
                </NotificationDropdown>
              </div>,
        col4: `${nombre} ${apellido_paterno} ${apellido_materno || ""}`.toUpperCase(),
        col5: device.toUpperCase(),
        col6: `${falla}`.toUpperCase(),
        col7: `$ ${price}`,
        col8: DateTime.fromMillis(deadlineDate).toLocaleString(DateTime.DATETIME_MED),
        col9: <div className="flex justify-center">
          <img
            src={require("assets/img/daniel.jpg")}
            alt="..."
            className="w-10 h-10 rounded-full border-2 border-g ay-100 shadow"
          ></img>
        </div>,
        col10: <CardOrdersDropdown
          path={`/admin/order-new/${id}?last_url=${location.pathname}`}
          id={id}
          fetchOrders={fetchOrders}
        />,        
      }

    ))

    return ordersFiltered
  }, [orders, location.pathname])


  const tableInstance = useTable({ columns, data })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const orderToModal = orders.filter( order => order.id === index)[0]

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
                  Ordenes de Servicio
              </h3>
                <Link
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  to={`/admin/order-new?last_url=${location.pathname}`}
                  type="button"
                >
                  Nueva Orden
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
        <table className="mt-12 items-center w-full bg-transparent border-collapse" {...getTableProps()}>
            <thead>
              {
                headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                      headerGroup.headers.map(column => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}
                          className={
                            "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-gray-100 text-gray-600 border-gray-200"
                              : "bg-blue-800 text-blue-300 border-blue-700")
                          }
                        >
                          {// Render the header
                            column.render('Header')}
                        </th>
                      ))}
                  </tr>
                ))
              }
            </thead>
            <tbody {...getTableBodyProps()} >
              {
                rows.map(row => {
                  // Prepare the row for display
                  prepareRow(row)

                  return (
                    
                    // Apply the row props
                    <tr 
                      {...row.getRowProps()}
                      onClick={() => {
                        setIndex(orders.filter( order => order.folio === row.original.col2)[0]?.id)
                        toggleModal()
                      }}
                    >
                      {
                        // Loop over the rows cells
                        row.cells.map(cell => {
                          
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4" >
                              {// Render the cell contents
                                cell.render('Cell')}
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <CardModal showModal={showModal} order={ orderToModal } setShowModal={setShowModal} />
          
          
        </div>
      </div>
    </>
  );
}
