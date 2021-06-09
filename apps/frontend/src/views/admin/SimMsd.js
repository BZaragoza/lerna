import React from "react";

// components
import CardSims from "components/Cards/CardSims";
import CardMsds from "components/Cards/CardMsds";



export default function SimMsd() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-6/12 mb-12 px-4">
          <CardSims />
        </div>
        <div className="w-6/12 mb-12 px-4">
          <CardMsds />
        </div>
      </div>
    </>
  );
}