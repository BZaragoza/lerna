import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { solutionSchema } from "../../schemas/schemas";

import InputBoxForm from "components/Forms/InputBoxForm";

// components

export default function CardSolutionNew() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(solutionSchema)
  })

  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const [faults, setFaults] = useState([]);

  console.log(errors);

  const onSubmit = (data) => {
    return isAddMode
      ? createSolution(data)
      : updateSolution(id, data)
  }

  const createSolution = (newSolution) => {

    fetch("/soluciones", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSolution)
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(res => {
        console.log(res)
        history.goBack()
      })

  }

  const updateSolution = (id, newSolution) => {
    fetch(`/soluciones/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSolution)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        history.goBack()
      })
  }


  useEffect(() => {

    fetch("/fallas")
      .then(res => res.json())
      .then(({ res }) => setFaults(res))

  }, [])

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/soluciones/${id}`)
        .then(res => res.json())
        .then(({ query }) => {
          const fields = ["falla_id", "solucion", "descripcion"]
          fields.map(field => setValue(field, query[field]))
        })
    }

  }, [id, isAddMode, setValue]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Nueva Solucion</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="falla_id"
                  >
                    Falla
                  </label>
                  <select defaultValue={null} {...register("falla_id")} className="uppercase px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option value={null}></option>
                    {
                      faults.map(({ id, falla }) => {
                        return <option key={falla} value={parseInt(id)}>{falla}</option>
                      })
                    }
                  </select>
                </div>
              </div>

              <InputBoxForm
                register={register}
                label="Solucion"
                input="solucion"
                required
                large
              />

              <InputBoxForm
                register={register}
                label="Descripcion de Solucion"
                input="descripcion"
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
