import React from "react";
import { DateTime } from 'luxon';

export default function Modal({ showModal, setShowModal, order }) {

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <p className="text-3xl font-semibold">
                    Orden de Servicio
                  </p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="container px-4 mx-auto">
                  <div className="flex flex-wrap">

                    <div className="w-1/2 px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Folio:</strong> { order?.folio }
                      </p>
                    </div>

                    <div className="w-1/2 px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Fecha Entrada:</strong> {DateTime.fromMillis(order?.receptionDate).toLocaleString(DateTime.DATETIME_MED)}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Fecha Entregado:</strong> {DateTime.fromMillis(order?.deadlineDate).toLocaleString(DateTime.DATETIME_MED)}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-12/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Cliente:</strong> {`${order?.nombre} ${order?.apellido_paterno || ""} ${order?.apellido_materno || ""}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-12/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Status:</strong> {`${order.status}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Telefono 1:</strong> {order?.telefono1}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Telefono 2:</strong> {order?.telefono2}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Equipo:</strong> {`${order?.marca} ${order?.modelo} ( ${ order?.modelo_num } )`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-6/12 px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Dejo:</strong> {order?.dejo ? "SI" : "NO"}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Pin o Patron 1:</strong> {`${order?.pin1}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Pin o Patron 2:</strong> {`${order?.pin2}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Falla:</strong> {`${order.falla}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>A Realizar:</strong> {`${order.solucion}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Bateria:</strong> {order?.battery ? "SI" : "NO"}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Chip:</strong> {`${order?.compañia}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>MSD:</strong> {order?.capacidad === 0 ? 'NO' : `${order?.capacidad} GB`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Cargador:</strong> {order?.charger ? "SI" : "NO"}
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="container px-4 mx-auto">
                  <div className="flex flex-wrap">
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Precio:</strong> {`$ ${order?.price}`}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Abono:</strong> {`$ ${order?.anticipo}`}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-4/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Resta:</strong> {`$ ${order?.remain}`}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Notas:</strong> {`${order?.notes}`.toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-6/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Tecnico:</strong> Daniel
                      </p>
                    </div>
                    <div className="w-full px-4 md:w-12/12 md:flex-none">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        <strong>Notas del Tecnico:</strong>
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}