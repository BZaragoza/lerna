/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import CardDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            dPasada
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <CardDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Menu
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Inicio
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/orders") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/orders"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/orders") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Ordenes de Servicio
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/order-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/order-new"
                >
                  <i
                    className={
                      "fas fa-folder-plus mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/order-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva Orden
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/clients") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/clients"
                >
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/clients") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Clientes
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/client-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/client-new"
                >
                  <i
                    className={
                      "fas fa-user-plus mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/client-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nuevo Cliente
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/brands-models") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/brands-models"
                >
                  <i
                    className={
                      "fas fa-mobile-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/brands-models") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Marcas y Modelos
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/brand-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/brand-new"
                >
                  <i
                    className={
                      "fas fa-tty mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/brand-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva Marca
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/model-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/model-new"
                >
                  <i
                    className={
                      "fas fa-plus mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/model-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nuevo Modelo
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/faults-solutions") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/faults-solutions"
                >
                  <i
                    className={
                      "fas fa-mobile-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/faults-solutions") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Fallas y Soluciones
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/fault-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/fault-new"
                >
                  <i
                    className={
                      "fas fa-tty mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/fault-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva Falla
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/solution-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/solution-new"
                >
                  <i
                    className={
                      "fas fa-plus mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/solution-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva Solucion
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/sim-msd") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/sim-msd"
                >
                  <i
                    className={
                      "fas fa-mobile-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/sim-msd") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Compañias y MSD
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/sim-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/sim-new"
                >
                  <i
                    className={
                      "fas fa-sim-card mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/sim-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva Compañia
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/msd-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/msd-new"
                >
                  <i
                    className={
                      "fas fa-sd-card mr-2 text-sm" +
                      (window.location.href.indexOf("/admin/msd-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nueva MSD
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Administracion
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/technicals") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/technicals"
                >
                  <i
                    className={
                      "fas fa-users-cog mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/technicals") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Tecnicos
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/technical-new") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/technical-new"
                >
                  <i
                    className={
                      "fas fa-user-cog mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/technical-new") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Nuevo Tecnico
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/order") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/order"
                >
                  <i
                    className={
                      "fas fa-user-cog mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/order") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Orden Servicio
                </Link>
              </li>
              </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
