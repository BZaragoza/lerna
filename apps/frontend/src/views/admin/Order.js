import React from "react";

// components

import CardOrder from "components/Cards/CardOrder.js";

export default function Order() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-6/12 mb-12 px-4">
          <CardOrder />
        </div>
      </div>
    </>
  );
}