import React from "react";

// components

import CardTechnicals from "components/Cards/CardTechnicals.js";

export default function Clients() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-6/12 mb-12 px-4">
          <CardTechnicals />
        </div>
      </div>
    </>
  );
}