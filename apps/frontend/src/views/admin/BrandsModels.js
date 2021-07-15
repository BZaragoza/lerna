import React from "react";

// components

import CardBrands from "components/Cards/CardBrands.js";
import CardModels from "components/Cards/CardModels.js";

export default function BrandsModels() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-5/12 mb-12 px-4">
          <CardBrands />
        </div>
        <div className="w-7/12 mb-12 px-4">
          <CardModels />
        </div>
      </div>
    </>
  );
}