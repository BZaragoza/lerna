import React, { useState, createRef } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";

export default function CardEditDeleteDropdown ({ table, id, fetchFunction }) {

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const deleteClient = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/${table}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        fetchFunction()
      })
  }

  return (
    <div>
      <div
        className="cursor-pointer text-gray-600 py-1 px-3"
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
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link to={`/admin/${table}-new/${id}`} >
          <p className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">
            Editar
          </p>
        </Link>
        <p onClick={deleteClient} className="cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">
          Eliminar  
        </p>
      </div>
    </div>
  );
};