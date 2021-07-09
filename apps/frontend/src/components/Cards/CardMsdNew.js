import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import queryString from 'query-string'


import { msdSchema } from "schemas/schemas";
import InputBoxForm from "components/Forms/InputBoxForm";


export default function CardSimNew() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(msdSchema)
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
      ? createMsd(data)
      : updateMsd(id, data)
  }

  const createMsd = (newMsd) => {
    fetch("/msd", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMsd)
    })
      .then( res => res.json() )
      .then( res => { 
        console.log(res)
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/sim-msd')
      })
  }

  const updateMsd = (id, newMsd) => {
    fetch(`/msd/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMsd)
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
      fetch(`/msd/${id}`)
        .then( res => res.json() )
        .then( ({query}) => {
          const fields = ['capacidad'];
          fields.map(field => setValue(field, query[field]));
        });
    }
  }, [isAddMode, id, setValue]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nueva": "Editar"} Micro SD</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <InputBoxForm 
                register={ register } 
                label="Capacidad"
                input="capacidad"
                type="number" 
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
        </div>
      </div>
    </>
  );
}
