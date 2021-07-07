import React from "react";

// components

// import CardOrderNew from "components/Cards/CardOrderNew.js";
import CardOrderNew from "components/Cards/CardOrderNew";

export default function OrderNew() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardOrderNew />
          {/* <CardOrderNew /> */}
        </div>
      </div>
    </>
  );
}