import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { DateTime } from 'luxon';

import CardOrdersDropdown from "components/Dropdowns/CardOrdersDropdown.js";
import NotificationDropdown from 'components/Dropdowns/NotificationDropdown'
import CardModal from "components/Cards/CardModal.js";
import OrderTable from "components/Table/OrderTable"

import CardReactModal from "components/Cards/CardReactModal"

// components

export default function CardOrdersLite({ color = "light" }) {

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

  const filterStatusOrders = (rows, id, filterValue) => {
    return rows.filter(row => row.original.col3 === filterValue)
  }

  filterStatusOrders.autoRemove = val => typeof val !== 'string'

  const filterTechniciansOrders = (rows, id, filterValue) => {
    return rows.filter(row => row.original.col9 === filterValue)
  }

  filterTechniciansOrders.autoRemove = val => typeof val !== 'string'

  const getInfoToGeneralCells = (orders, status, folio) => {

    let color, id;
    orders.map(order => {
      if (order.status === status && order.folio === folio) {
        color = order.color
        id = order.id
      }
    })

    return [color, id]
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
        filter: filterStatusOrders,
        Cell: (props) => {
          const [color, id] = getInfoToGeneralCells(orders, props.cell.value, props.cell.row.original.col2);

          return <div onClick={e => e.stopPropagation()}>
            <NotificationDropdown fetchOrders={fetchOrders} orderId={id} >
              <span className={color + " cursor-pointer text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1"} >
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
        filter: filterTechniciansOrders,
      },
      {
        Header: 'Editar',
        accessor: 'col10',
        onClick: stopProp,
        Cell: (props) => {
          return <div onClick={stopProp}>{props.cell.value}</div>;
        }
      },
    ], [orders]);



  const data = useMemo(() => {

    const ordersFiltered = orders.map(({ id, receptionDate, folio, status, color, nombre,
      apellido_paterno, apellido_materno, device, falla, price, deadlineDate, technician
    }) => (

      {
        col1: DateTime.fromMillis(receptionDate).toLocaleString(DateTime.DATETIME_MED),
        col2: folio,
        col3: status,
        col4: `${nombre} ${apellido_paterno} ${apellido_materno || ""}`.toUpperCase(),
        col5: device.toUpperCase(),
        col6: `${falla}`.toUpperCase(),
        col7: `$ ${price}`,
        col8: DateTime.fromMillis(deadlineDate).toLocaleString(DateTime.DATETIME_MED),
        col9: technician,
        // col9: <div className="flex justify-center">
        //   <img
        //     src={require("assets/img/daniel.jpg")}
        //     alt="..."
        //     className="w-10 h-10 rounded-full border-2 border-g ay-100 shadow"
        //   ></img>
        // </div>,
        col10: <CardOrdersDropdown
          path={`/admin/order-new/${id}?last_url=${location.pathname}`}
          id={id}
          fetchOrders={fetchOrders}
        />,
      }

    ))

    return ordersFiltered
  }, [orders, location.pathname])

  const orderToModal = orders.filter(order => order.id === index)[0]

  return (
    <>
      <OrderTable
        techColumn='col9'
        statusColumn='col3'
        orders={orders}
        columns={columns}
        data={data}
        orders={orders}
        setIndex={setIndex}
        toggleModal={toggleModal}
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
      </OrderTable>
      <CardReactModal showModal={showModal} order={orderToModal} setShowModal={setShowModal} />
    </>
  );
}
