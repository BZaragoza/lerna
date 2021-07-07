import React from "react";

// components

import CardDeviceNew from "components/Cards/CardDeviceNew";

export default function DeviceNew() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-6/12 mb-12 px-4">
          <CardDeviceNew />
        </div>
      </div>
    </>
  );
}