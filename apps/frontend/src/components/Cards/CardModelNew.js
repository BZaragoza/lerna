import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import queryString from 'query-string'
import { yupResolver } from "@hookform/resolvers/yup";
import { modelSchema } from "schemas/schemas";

import InputBoxForm from "components/Forms/InputBoxForm";


export default function CardModelNew() {

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(modelSchema)
  })

  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true)

  const { last_url } = queryString.parse( location.search )

  console.log(errors)

  useEffect(() => {

    fetch("/marcas")
      .then(res => res.json())
      .then(({ res }) => {
        setBrands(res)
        setLoading(false)
      })

  }, [])

  const onSubmit = (data) => {
    return isAddMode
      ? createModel(data)
      : updateModel(id, data)
  }

  const createModel = (newModel) => {

    fetch("/modelos", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newModel)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/brands-models')
      })

  }

  const updateModel = (id, newModel) => {
    fetch(`/modelos/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newModel)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return last_url
          ? history.push( last_url )
          : history.push( '/admin/brands-models')
      })
  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/modelos/${id}`)
        .then(res => res.json())
        .then(({ query }) => {
          const fields = ["marca_id", "modelo", "modelo_num"]
          fields.map(field => setValue(field, query[field]));
        })
    }

  }, [isAddMode, id, setValue]);


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nuevo" : "Editar"} Modelo</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Marcas
                </label>
                  <select defaultValue={ null || getValues("marca_id")} {...register("marca_id")} className="uppercase px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option value={null}></option>
                    {
                      !loading && 
                      (
                        brands.map(({ marca, id }) => {
                          return <option key={marca} value={id}>{marca}</option>
                        })
                      )
                    }
                  </select>
                </div>
              </div>

              <InputBoxForm
                register={register}
                label="Modelo"
                input="modelo"
                required
                large
              />

              <InputBoxForm
                register={register}
                label="Modelo Numerico"
                input="modelo_num"
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
