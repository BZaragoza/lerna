import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CardOrdersDropdown from "components/Dropdowns/CardOrdersDropdown.js";

// components
import CardModal from "components/Cards/CardModal.js";
import { getBackColor } from "utils/utils";

export default function CardOrdersLite({ color }) {

  const [index, setIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
  }, []);

  const fetchOrders = () => {
    fetch("/orden")
      .then(res => res.json())
      .then(({ res }) => setOrders(res))
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
                  Ordenes de Servicio
              </h3>
                <Link
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  to="/admin/order-new"
                  type="button"
                >
                  Nueva Orden
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "}
                >
                  Entrada
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                >
                  Folio
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "}
                >
                  Cliente
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "}
                >
                  Equipo
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "}
                >
                  Falla
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "}
                >
                  Precio
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                >
                  Entrega
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center "}
                >
                  Tecnico
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center "}
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map( (order, index) => {

                  order.receptionDate = new Date(Date.parse(order.receptionDate) - 25200000).toISOString().substring(0, 16).replace("T", " ")
                  order.deadlineDate = new Date(Date.parse(order.deadlineDate) - 25200000).toISOString().substring(0, 16).replace("T", " ")
                  
                  return (
                    <tr
                      className="hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        setIndex(index)
                      }}
                      key={order.id}
                    >
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      { order.receptionDate.replace("T", " ").substring(0, 16) }
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <span className={getBackColor(order.status) + "text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1"}>
                        { order.folio }
                        </span>
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                      { `${order.nombre} ${order.apellido_paterno} ${order.apellido_materno || ""}`.toUpperCase() }
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {`${order.marca} ${order.modelo}`.toUpperCase()}
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        { `${order.falla}`.toUpperCase() }
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        { `$ ${order.price}` }
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        { order.deadlineDate.replace("T", " ").substring(0, 16) }
                      </td>
                      <td onClick={() => setShowModal(true)} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <div className="flex justify-center">
                          <img
                            src={require("assets/img/daniel.jpg")}
                            alt="..."
                            className="w-10 h-10 rounded-full border-2 border-gray-100 shadow"
                          ></img>
                        </div>
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center">
                        <CardOrdersDropdown order={order} id={order.id} fetchOrders={fetchOrders} />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <CardModal showModal={showModal} order={orders[index]} setShowModal={setShowModal} />
          
          
        </div>
      </div>
    </>
  );
}

CardOrdersLite.defaultProps = {
  color: "light",
};

CardOrdersLite.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
