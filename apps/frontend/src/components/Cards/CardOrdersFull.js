import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DateTime } from 'luxon';

// components

import CardOrdersDropdown from "components/Dropdowns/CardOrdersDropdown.js";
import NotificationDropdown from 'components/Dropdowns/NotificationDropdown';
import OrderTable from "components/Table/OrderTable"

export default function CardOrdersFull({ color }) {

  const [orders, setOrders] = useState([]);
  const [prefilteredOrders, setPrefilteredOrders] = useState([])

  useEffect(() => {
    setPrefilteredOrders([...orders])
  }, [orders])

  const location = useLocation();

  useEffect(() => {
    let isMounted = true
    if (isMounted) fetchOrders()

    return () => { isMounted = false }
  }, []);

  const fetchOrders = () => {
    fetch("/orden")
      .then(res => res.json())
      .then(({ res }) => setOrders(res))
  }

  const filterStatusOrders = (rows, id, filterValue) => {
    return rows.filter(row => row.original.col3 === filterValue)
  }

  filterStatusOrders.autoRemove = val => typeof val !== 'string'

  const filterTechniciansOrders =  (rows, id, filterValue) => {
    return rows.filter(row => row.original.col23 === filterValue)
  }

  filterTechniciansOrders.autoRemove = val => typeof val !== 'string'
  
  const getInfoToGeneralCells = ( orders, status, folio ) => {
    
    let color, id;
    orders.map( order => {
      if (order.status === status && order.folio === folio) {
        color = order.color
        id = order.id
      }
    })

    return [color, id] 
  }

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
        filter: filterStatusOrders,
        Cell: (props) => {

          const [ color, id ] = getInfoToGeneralCells(orders, props.cell.value, props.cell.row.original.col2 )

          return <div onClick={ e => e.stopPropagation() }>
          <NotificationDropdown fetchOrders={fetchOrders} orderId={id} >
            <span className={color + " text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1"} >
              {props.cell.value}
            </span>
          </NotificationDropdown>
        </div>;
        }
      },
      {
        Header: 'Cliente',
        accessor: 'col4',
      },
      {
        Header: 'Teléfono',
        accessor: 'col5',
      },
      {
        Header: 'Teléfono 2',
        accessor: 'col6',
      },
      {
        Header: 'Dispositivo',
        accessor: 'col7',
      },
      {
        Header: 'Equipo',
        accessor: 'col8',
      },
      {
        Header: 'Dejo',
        accessor: 'col9',
      },
      {
        Header: 'Falla',
        accessor: 'col10',
      },
      {
        Header: 'A Realizar',
        accessor: 'col11',
      },
      {
        Header: 'Bateria',
        accessor: 'col12',
      },
      {
        Header: 'Chip',
        accessor: 'col13',
      },
      {
        Header: 'MSD',
        accessor: 'col14',
      },
      {
        Header: 'Cargador',
        accessor: 'col15',
      },
      {
        Header: 'Precio',
        accessor: 'col16',
      },
      {
        Header: 'Abono',
        accessor: 'col17',
      },
      {
        Header: 'Resta',
        accessor: 'col18',
      },
      {
        Header: 'Fecha Entrega',
        accessor: 'col19',
      },
      {
        Header: 'PIN o Patron 1',
        accessor: 'col20',
      },
      {
        Header: 'PIN o Patron 2',
        accessor: 'col21',
      },
      {
        Header: 'Notas',
        accessor: 'col22',
      },
      {
        // Header: 'Notas del  Tecnico',
        Header: 'Tecnico',
        accessor: 'col23',
        filter: filterTechniciansOrders,
      },
      {
        Header: 'Editar',
        accessor: 'col24',
        disableFilters: true,
      },
    ], [orders]);

  const data = useMemo(() => {

    const ordersFiltered = prefilteredOrders?.map(({ id, receptionDate, folio, status, color, nombre,
      apellido_paterno, apellido_materno, telefono1, telefono2, device, marca, modelo, modelo_num,
      dejo, falla, solucion, battery, compañia, capacidad, charger, price, anticipo, remain,
      deadlineDate, pin1, pin2, notes, technician
    }) => (

      {
        col1: DateTime.fromMillis(receptionDate).toLocaleString(DateTime.DATETIME_MED),
        col2: folio,
        // col3: <div onClick={ e => e.stopPropagation() }>
        //         <NotificationDropdown fetchOrders={fetchOrders} orderId={id} >
        //           <span className={color + " text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1"} >
        //             {status}
        //           </span>
        //         </NotificationDropdown>
        //       </div>,
        col3: status,
        col4: `${nombre} ${apellido_paterno} ${apellido_materno || ""}`.toUpperCase(),
        col5: telefono1,
        col6: telefono2,
        col7: device.toUpperCase(),
        col8: `${marca} ${modelo} ( ${modelo_num} )`.toUpperCase(),
        col9: dejo ? "SI" : "NO",
        col10: `${falla}`.toUpperCase(),
        col11: `${solucion}`.toUpperCase(),
        col12: battery ? "SI" : "NO",
        col13: `${compañia}`.toUpperCase(),
        col14: capacidad === 0 ? 'NO' : `${capacidad} GB`.toUpperCase(),
        col15: charger ? "SI" : "NO",
        col16: `$ ${price}`,
        col17: `$ ${anticipo}`,
        col18: `$ ${remain}`,
        col19: DateTime.fromMillis(deadlineDate).toLocaleString(DateTime.DATETIME_MED),
        col20: `${pin1}`.toUpperCase(),
        col21: pin2 ? `${pin2}`.toUpperCase() : "",
        col22: `${notes}`.toUpperCase(),
        // col22: `${notes}`.toUpperCase(),
        col23: `${ technician }`,
        // col23: <div className="flex justify-center">
        //   <img
        //     src={require("assets/img/daniel.jpg")}
        //     alt="..."
        //     className="w-10 h-10 rounded-full border-2 border-g ay-100 shadow"
        //   ></img>
        // </div>,
        col24: <CardOrdersDropdown
          path={`/admin/order-new/${id}?last_url=${location.pathname}`}
          id={id}
          fetchOrders={fetchOrders}
        />
      }

    ))

    return ordersFiltered
  }, [location.pathname, prefilteredOrders])

  return (
    <OrderTable 
      techColumn='col23'
      statusColumn='col3'
      orders={ orders } 
      setPrefilteredOrders={ setPrefilteredOrders }
      columns={ columns } 
      data={ data }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <div className="flex justify-between">
              <h3
                className={
                  "font-semibold text-lg" +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                Ordenes de Servicio
              </h3>
              <Link to={`/admin/order-new?last_url=${location.pathname}`}>
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Nueva Orden
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OrderTable>
  )
};