import React from "react";

// components

import CardClients from "components/Cards/CardClients.js";

export default function Clients() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardClients/>
        </div>
      </div>
    </>
  );
}