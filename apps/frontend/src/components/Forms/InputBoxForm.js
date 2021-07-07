import React from 'react'

const InputBoxForm = ({ register, label, input, required, large }) => {

  return (
    <div className={ `w-full px-4 ${!large && 'lg:w-4/12'}` }>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor={ input }
        >
          { label }
        </label>
        <input
          {...register(input, { required })}
          type="text"
          autoComplete="off"
          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
        />
      </div>
    </div>
  )
  
}

export default InputBoxForm
