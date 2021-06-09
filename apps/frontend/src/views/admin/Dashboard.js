import React from "react";

// components
import CardOrdersLite from "components/Cards/CardOrdersLite.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardOrdersLite />
        </div>
      </div>
    </>
  );
}
