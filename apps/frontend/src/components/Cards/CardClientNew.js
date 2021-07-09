import React, { useEffect, } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import queryString from 'query-string'

import { clientSchema } from "schemas/schemas";
import InputBoxForm from "components/Forms/InputBoxForm";

export default function CardClientNew() {

  const defaultValues = {
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono1: "844",
    telefono2: "",
    notas: "",
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(clientSchema),
    defaultValues
  });

  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const { last_url } = queryString.parse( location.search )
  

  console.log( errors )

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
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/clients')
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
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/clients')
      })
  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/clientes/${id}`)
        .then( res => res.json() )
        .then( ({query}) => {
          const fields = ['nombre', 'apellido_paterno', 'apellido_materno', 'telefono1', 'telefono2', 'notas'];
          fields.map(field => setValue(field, query[field] || "" ));
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
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <InputBoxForm register={ register } required label="Nombre" input="nombre" />
              <InputBoxForm register={ register } required label="Apellido Paterno" input="apellido_paterno" />
              <InputBoxForm register={ register } label="Apellido Materno" input="apellido_materno" />
              <InputBoxForm register={ register } required label="Telefono 1" input="telefono1" />
              <InputBoxForm register={ register } label="Telefono 2" input="telefono2" />
              <InputBoxForm register={ register } large label="Notas" input="notas" />
              
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
