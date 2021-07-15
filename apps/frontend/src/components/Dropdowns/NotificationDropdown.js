import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";

const CardDropdown = ({ fetchOrders, orderId, children }) => {

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const [statuses, setStatuses] = useState([]);
  
  

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = () => {
    fetch("/status")
      .then(res => res.json())
      .then(({ res }) => setStatuses(res))
  }

  const doSomething = (statusId) => {
    
    fetch(`/orden/update-state/${orderId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({statusId: Number(statusId)})
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        closeDropdownPopover()
        fetchOrders()
      })
  }

  return (
    <>
      <div
        className="cursor-pointer text-gray-600 block py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {children}
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
        }
      >
        {
          statuses?.map(({ status, id, color }) => (
            <div
              key={id}
              id={id}
              className={
                "cursor-pointer text-sm px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              }
              onClick={(e) => {
                e.preventDefault()
                doSomething(id)
              }}
            >
              <div className={color + "p-2 mb-1"}>
                {status}
              </div>
            </div>
          ))
        }



        <div className="h-0 my-2 border border-solid border-gray-200" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => e.preventDefault()}
        >
          Separated link
        </a>
      </div>
    </>
  );
};

export default CardDropdown;
