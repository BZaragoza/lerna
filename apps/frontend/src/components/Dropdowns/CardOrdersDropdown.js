import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";

export default function CardOrdersDropdown ({ order, id, fetchOrders}) {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div 
        className="text-gray-600 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block" : "hidden") + 
          " bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link to={`/admin/order-new/${id}`} >
          <p className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" >
            Editar
          </p>
        </Link>
        <Link to="/admin/orders">
          <p className= "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          onClick={(e) => e.preventDefault()}
          >
            Cambiar Estado
          </p>
        </Link>
        <p
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => e.preventDefault()}
        >
          Agregar Aviso
        </p>
      </div>
    </>
  );
};