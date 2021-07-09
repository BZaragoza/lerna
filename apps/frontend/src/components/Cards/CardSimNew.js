import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import queryString from 'query-string'

import InputBoxForm from "components/Forms/InputBoxForm";
import { simSchema } from "schemas/schemas";



const CardSimNew = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(simSchema)
  });
  
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const { last_url } = queryString.parse( location.search )

  console.log(errors)

  const onSubmit = (data) => {
    // console.log(data)
    return isAddMode
      ? createSim(data)
      : updateSim(id, data)
  }

  const createSim = (newSim) => {
    fetch("/chip", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSim)
    })
      .then( res => res.json() )
      .then( res => { 
        console.log(res)
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/sim-msd')
      })
  }

  const updateSim = (id, newSim) => {
    fetch(`/chip/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSim)
    })
      .then( res => res.json() )
      .then( res => { 
        console.log(res)
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/sim-msd')
      })
  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/chip/${id}`)
        .then( res => res.json() )
        .then( ({ query }) => {
          const fields = ['compañia'];
          fields.map(field => setValue(field, query[field]));
        });
    }
  }, [isAddMode, setValue, id])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nuevo" : "Editar"} Sim</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <InputBoxForm 
                 register={ register } 
                 label="Compañia"
                 input="compañia" 
                 required
                 large
              />



            </div>
            <div className="flex flex-wrap mt-6 justify-end">
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
          <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
            <input type="checkbox" className="hidden" id="footertoast" />

            <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white" title="close">
              Toast Alert (click anywhere to close)
            
              <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSimNew;