
import InputBoxForm from "components/Forms/InputBoxForm";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

// components

export default function CardTechnicalNew() {

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    // resolver: yupResolver(simSchema),
    defaultValues,
  });

  console.log( errors );

  // const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const onSubmit = (data) => {
    // console.log(data)
    return isAddMode
      ? createTechnician(data)
      : updateTechnician(id, data)
  }

  const createTechnician = (newTechnician) => {
    fetch("/technician", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTechnician)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // history.goBack()
      })
  }

  const updateTechnician = (id, newTechnician) => {

    fetch(`/technician/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTechnician)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // history.goBack()
      })
  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/technician/${id}`)
        .then(res => res.json())
        .then(({ query }) => {
          console.log(query)
          const fields = ['name', 'email',];
          fields.map(field => setValue(field, query[field] || ""));
        });
    }
  }, [isAddMode, id, setValue]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
          <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nuevo" : "Editar"} Tecnico</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">

              <InputBoxForm
                register={register}
                label="Nombre"
                input="name"
                // required
                large
              />

              <InputBoxForm
                register={register}
                label="Email"
                input="email"
                // required
                large
              />

              {

                isAddMode &&
                  (
                    <>
                      <InputBoxForm
                        register={register}
                        label="Contraseña"
                        input="password"
                        // type="password"
                        // required
                        large
                      />

                      <InputBoxForm
                        register={register}
                        label="Confirmar Contraseña"
                        input="password2"
                        // type="password"
                        // required
                        large
                      />
                    </>
                  )

              }

              {/* <InputBoxForm
                register={register}
                label="Foto"
                input="photo"
                type="file"
                // required
                large
              /> */}

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
