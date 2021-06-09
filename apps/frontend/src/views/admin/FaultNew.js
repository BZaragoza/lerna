import React from "react";

// components

import CardFaultNew from "components/Cards/CardFaultNew.js";

export default function FaultNew() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-6/12 mb-12 px-4">
          <CardFaultNew />
        </div>
      </div>
    </>
  );
}