import React from "react";

// components

import CardFaults from "components/Cards/CardFaults.js";
import CardSolutions from "components/Cards/CardSolutions.js";

export default function FaultsSolutions() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-6/12 mb-12 px-4">
          <CardFaults />
        </div>
        <div className="w-6/12 mb-12 px-4">
          <CardSolutions />
        </div>
      </div>
    </>
  );
}