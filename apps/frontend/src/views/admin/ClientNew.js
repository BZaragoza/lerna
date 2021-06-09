import React from "react";

// components

import CardClientNew from "components/Cards/CardClientNew.js";

export default function ClienteNew() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardClientNew />
        </div>
      </div>
    </>
  );
}