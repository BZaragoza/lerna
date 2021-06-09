import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { clientSchema } from "schemas/schemas";

export default function CardClientNew() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(clientSchema)
  })

  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;
  

  console.log(errors)

  const onSubmit = (data) => {
    return isAddMode 
      ? createClient(data)
      : updateClient(id, data)
  }

  const createClient = (newClient) => {
    
    fetch("/clientes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClient)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        history.goBack()
      })
  }

  const updateClient = (id, newClient) => {
    
    fetch(`/clientes/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClient)
    })
      .then(res => res.json())
      .then(res => { 
        console.log(res)
        history.goBack()
      })
  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/clientes/${id}`)
        .then( res => res.json() )
        .then( ({query}) => {
          const fields = ['nombre', 'apellido_paterno', 'apellido_materno', 'telefono1', 'telefono2', 'notas'];
          fields.map(field => setValue(field, query[field]));
          // setClient(client);
        });
    }
  }, [isAddMode, id, setValue]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nuevo" : "Editar"} Cliente</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre
                    </label>
                  <input
                    {...register("nombre", { required: true })}
                    type="text"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Apellido Paterno
                    </label>
                  <input
                    {...register("apellido_paterno", {required: true})}

                    type="text"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Apellido Materno
                    </label>
                  <input
                    {...register("apellido_materno")}
                    type="text"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Telefono 1
                    </label>
                  <input
                    {...register("telefono1", {required: true})}
                    type="tel"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Telefono 2
                    </label>
                  <input
                    {...register("telefono2", {minLength: 10})}
                    type="tel"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Notas
                    </label>
                  <textarea
                    {...register("notas")}
                    type="text"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    rows="1"
                  ></textarea>
                </div>
              </div>
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
