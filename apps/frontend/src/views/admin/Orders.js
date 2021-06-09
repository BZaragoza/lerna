import React from "react";

// components

import CardOrdersFull from "components/Cards/CardOrdersFull.js";

export default function Orders() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardOrdersFull />
        </div>
      </div>
    </>
  );
}