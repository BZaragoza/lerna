import React from 'react'

export default function CardToast({ showWarn, setShowWarn }) {

  return (
    <>
      {
        showWarn
          ? <div className="w-1/2 bottom-0 border-2 right-0 mb-3 mr-12 items-center rounded-lg 
          flex overflow-x-hidden overflow-y-auto fixed z-50">
            <div
              className="bg-white pl-4 pr-6 py-4 flex shadow-md rounded-sm w-96 max-w-9/10 origin-center relative 
              flex appear-done enter-done"
              onClick={() => setShowWarn(false)}
            >
              <div className="leading-none flex-1">
                <h4 className="font-semibold">Evita Campos vacíos</h4>
                <p className="mt-3 text-sm">No</p>
              </div>
              <div
                className="bg-red-500 mr-2 ml-3 flex-3 text-right font-bold py-2 px-4 rounded"
              >
                <i className="fas fa-times hover:bg-blue-500 "></i>
              </div>
            </div>
          </div>
          : null
      }
    </>
  )


}