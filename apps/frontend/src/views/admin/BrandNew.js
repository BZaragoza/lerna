import React from "react";

// components

import CardBrandNew from "components/Cards/CardBrandNew.js";

export default function BrandNew() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-6/12 mb-12 px-4">
          <CardBrandNew />
        </div>
      </div>
    </>
  );
}