import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
// import { orderSchema } from "schemas/schemas";

import React, { useState, useEffect, useCallback } from "react";
// import { Link, useHistory, useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { DateTime } from 'luxon';
// import { yupResolver } from "@hookform/resolvers/yup";

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

registerLocale("es", {
  ...es,
  localize: {
    ...es.localize,
    month: n => months[n]
  }
});




export default function CardOrderNew() {


  const defaultValues = {
    receptionDate: new Date(),
    deadlineDate: new Date(),
    dejo: false,
    encendido: false,
    battery: false,
    charger: false,
    status: null,
  }

  defaultValues.deadlineDate.setDate( defaultValues.deadlineDate.getDate() + 1 )
  defaultValues.deadlineDate.setHours(17, 0, 0);
  
  // const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm({
  const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
    defaultValues,
    // resolver: yupResolver(orderSchema)
  })

  // const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const [msd, setMsd] = useState([]);
  const [chip, setChip] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [faults, setFaults] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [clients, setClients] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [devices, setDevices] = useState([])

  useEffect(() => {

    fetch("/marcas")
      .then(res => res.json())
      .then(({ res }) => setBrands(res))

    fetch("/modelos")
      .then(res => res.json())
      .then(({ res }) => setModels(res))

    fetch("/fallas")
      .then(res => res.json())
      .then(({ res }) => setFaults(res))

    fetch("/soluciones")
      .then(res => res.json())
      .then(({ res }) => setSolutions(res))

    fetch("/msd")
      .then(res => res.json())
      .then(({ res }) => setMsd(res))

    fetch("/chip")
      .then(res => res.json())
      .then(({ res }) => setChip(res))

    fetch("/clientes")
      .then(res => res.json())
      .then(({ res }) => setClients(res))

    fetch("/status")
      .then(res => res.json())
      .then(({ res }) => setStatuses(res))

    fetch("/devices")
      .then(res => res.json())
      .then(({ res }) => setDevices(res))


  }, [setValue]);

  const onSubmit = (data) => {
    delete data.models
    delete data.solutions
    data.remain = data.price - data.anticipo
    data.status = Number(data.status)


    data.receptionDate = DateTime.local().toMillis();
    data.deadlineDate = DateTime.local(data.deadlineDate).ts

    console.log(data)
    return isAddMode
      ? createOrder(data)
      : updateOrder(id, data)
  }

  const createOrder = (newOrder) => {
    fetch("/orden", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // history.goBack()
      })
  }

  const updateOrder = (id, newOrder) => {
    fetch(`/orden/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // history.goBack()
      })
  }

  const price = watch("price");
  const anticipo = watch("anticipo");
  const client_id = watch("client_id");
  const marca_id = watch("marca_id");
  const falla_id = watch("falla_id");

  useEffect(() => {
    const remain = price - anticipo
    setValue("remain", remain, { shouldDirty: true })
  }, [price, anticipo, setValue]);

  const handleClientsChange = () => {
    if (client_id) {
      const { telefono1, telefono2 } = clients.filter(client => client.id === parseInt(client_id))[0]
      setValue("telefono1", telefono1)
      setValue("telefono2", telefono2)
    } else {
      setValue("telefono1", null)
      setValue("telefono2", null)
    }
  }

  const handleModelsChange = () => {
    const modelsFiltered = models.filter(model => model.marca_id === parseInt(marca_id))
    setValue("models", modelsFiltered)
  }

  const handleSolutionsChange = () => {
    const solutionsFiltered = solutions.filter(solution => solution.falla_id === parseInt(falla_id))
    setValue("solutions", solutionsFiltered)
  }

  const [, setUnusedState] = useState()
  const forceUpdate = useCallback(() => setUnusedState({}), [])

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/orden/${id}`)
        .then(res => res.json())
        .then(({ query }) => {

          console.log(query)

          setValue("status", query.status_id)
          setValue("status", query.device)
          setValue("client_id", query.client_id)
          setValue("marca_id", query.marca_id)

          query.receptionDate = new Date(query.receptionDate)
          query.deadlineDate = new Date(query.deadlineDate)
          const fields = [
            "folio", "receptionDate", "deadlineDate", "client_id", "telefono1", "telefono2", "marca_id", "modelo_id", "dejo",
            "encendido", "falla_id", "solucion_id", "battery", "chip", "msd", "charger", "pin1", "pin2", "price", "anticipo", "remain",
            "notes", "status", "device"
          ]
          fields.map(field => setValue(field, query[field]))
        })
    } else {
      fetch("/folio")
        .then(res => res.json())
        .then(({ folio }) => setValue("folio", folio || 'RC0860' ))

    }
  }, [isAddMode, id, setValue])

  return (
    <div className="">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nueva" : "Editar"} Orden de Servicio</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="folio"
                  >
                    Folio
                  </label>
                  <input
                    disabled
                    {...register("folio", {})}
                    autoComplete="off"
                    type="text"
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
                    Fecha Recepcion
                  </label>
                  <Controller
                    name={"receptionDate"}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return <DatePicker
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={e => onChange(e)}
                        selected={value}
                        name="startDate"
                        popperPlacement='bottom'
                        popperModifiers={{
                          flip: {
                            behavior: ['bottom'] // don't allow it to flip to be above
                          },
                          preventOverflow: {
                            enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                          },
                          hide: {
                            enabled: false // turn off since needs preventOverflow to be enabled
                          }
                        }}
                        showTimeSelect
                        autoComplete="off"
                        timeInputLabel="Hora:"

                        dateFormat="dd MMMM yyyy hh:mm aa"
                        locale="es-ES"
                      />
                    }
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="deadlineDate"
                  >
                    Fecha a Entregar
                  </label>
                  <Controller
                    name={"deadlineDate"}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return <DatePicker
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={e => onChange(e)}
                        selected={value}
                        name="startDate"
                        popperPlacement='bottom'
                        popperModifiers={{
                          flip: {
                            behavior: ['bottom']
                          },
                          preventOverflow: {
                            enabled: false
                          },
                          hide: {
                            enabled: false
                          }
                        }}
                        showTimeSelect
                        autoComplete="off"
                        timeInputLabel="Hora:"

                        dateFormat="dd MMMM yyyy hh:mm aa"
                        locale="es-ES"
                      />
                    }
                    }
                  />
                </div>
              </div>



              <div className="w-full lg:w-4/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="deadlineDate"
                >
                  Estado
                </label>
                <Controller
                  name="status_id"
                  control={control}
                  render={({ field: { onChange, value } }) => {

                    const defaultStatus = statuses.filter( status => status.status.toLowerCase().includes('reparar'))[0]
                    
                    return (
                      <select {...register("status")} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                        <option defaultValue={ defaultStatus?.id }>{ defaultStatus?.status }</option>
                        {
                          statuses
                            // Quitar el estado por defecto de la lista de estados disponibles
                            .filter( status => !status.status.toLowerCase().includes('reparar'))
                            .map(({ status, id }) => {
                              return (
                                <option key={id} value={Number(id)} >{status}</option>
                              )
                          })
                        }
                      </select>
                    )
                  }}
                />
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="deadlineDate"
                >
                  Equipo
                </label>
                <Controller
                  name="device_id"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <select {...register("device")} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                        <option defaultValue={null}></option>
                        {
                          devices.map(({ id, device }) => {
                            return (
                              <option key={id} value={Number(id)} >{device}</option>
                            )
                          })
                        }
                      </select>
                    )
                  }}
                />
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-gray-400" />
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase flex justify-between">
              Informacion Cliente
              <Link to="/admin/client-new">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Nuevo Cliente
                </button>
              </Link>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cliente
                  </label>
                  <Controller
                    name="client_id"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <select
                          onClick={handleClientsChange}
                          onChange={onChange}
                          {...register("client_id")}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option defaultValue={null}>{ }</option>
                          {
                            clients?.map(({ id, nombre, apellido_paterno, apellido_materno }) => {
                              return <option key={`${nombre} ${id}`} value={id}>{nombre} {apellido_paterno} {apellido_materno}</option>
                            })
                          }
                        </select>
                      )
                    }}
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
                  <Controller
                    name="telefono1"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <input
                          disabled
                          onChange={onChange}
                          defaultValue={value}
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                      )
                    }}
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
                  <Controller
                    name="telefono2"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <input
                          onChange={onChange}
                          defaultValue={value}
                          type="tel"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                      )
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase flex justify-between">
              Informacion Equipo
              <Link to="/admin/brand-new">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Nueva Marca
                </button>
              </Link>
              <Link to="/admin/model-new">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Nuevo Modelo
                </button>
              </Link>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Marca
                  </label>
                  <Controller
                    name={"marca_id"}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <select
                          onChange={onChange}
                          onClick={() => {
                            handleModelsChange()
                            forceUpdate()
                          }}
                          value={value}
                          {...register("marca_id")}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option defaultValue={null}></option>
                          {
                            brands.map(({ marca, id }) => {
                              return <option
                                key={marca}
                                value={parseInt(id, 10)}
                                onClick={() => setValue("marca_id", id)}
                              >{marca}</option>
                            })
                          }
                        </select>
                      )
                    }
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Modelo
                </label>
                <Controller
                  name="modelo_id"
                  control={control}
                  render={({ field: { onChange, value = null } }) => {
                    
                    return (
                      <select
                        onChange={ onChange }
                        value={ String(value) }
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      >
                        <option defaultValue={ null }></option>
                        {
                          getValues("models")?.map(({ id, modelo }) => {
                            return (<option
                              
                              // onClick={() => setValue("modelo_id", Number(id))}
                              onClick={() => console.log(id)}
                              key={modelo}
                              value={id}
                            >
                              {
                                modelo
                              }
                            </option>)
                          }
                          )
                        }
                      </select>
                    )
                  }}
                />
                {/* <Controller
                  name={"modelo_id"}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return <select
                      onChange={onChange}
                      onClick={() => {
                        
                      }}
                      {...register("modelo_id")}
                      value={value}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option defaultValue={null}></option>
                      {
                        getValues("models")?.map(({ id, modelo }) =>{
                          console.log(id, modelo)
                          return (<option
                            onClick={() => setValue("modelo_id", id)}
                            key={modelo}
                            value={id}
                          >
                            {
                              modelo
                            }
                          </option> )}
                        )
                      }
                    </select>
                  }
                  }
                /> */}
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Dejo
                  </label>
                  <button
                    {...register("modelo_id", {})}
                    className={(getValues("dejo") ? "bg-blue-500 " : "bg-blue-300") +
                      " text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={() => {
                      forceUpdate();
                      setValue('dejo', !getValues("dejo"), { shouldValidate: true })
                    }}
                  >
                    {getValues("dejo") ? "Si" : "No"}
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Encendido
                  </label>
                  <button
                    className={(getValues("encendido") ? "bg-blue-500 " : "bg-blue-300") +
                      " text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={() => {
                      forceUpdate();
                      setValue("encendido", !getValues("encendido"), { shouldValidate: true })
                    }}
                  >
                    {getValues("encendido") ? "Si" : "No"}
                  </button>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-gray-400" />

              <div className="w-full lg:w-6/12 px-4">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase flex justify-between">
                  Posibles Fallas
                  <Link to="/admin/fault-new">
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Nueva Falla
                    </button>
                  </Link>
                  <Link to="/admin/solution-new">
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Nueva Solución
                    </button>
                  </Link>
                </h6>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Falla
                  </label>
                  <Controller
                    name="falla_id"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                      return (
                        <select
                          onChange={onChange}
                          onClick={() => {
                            handleSolutionsChange()
                            forceUpdate()
                          }}
                          value={value}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option defaultValue={null}></option>
                          {
                            faults.map(({ id, falla }) => {
                              return <option key={falla} value={parseInt(id)}>{falla}</option>
                            })
                          }
                        </select>
                      )
                    }}
                  />
                  {/* <select {...register("falla_id", {})} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option defaultValue={null}></option>
                    {
                      faults.map(({ id, falla }) => {
                        return <option key={falla} value={parseInt(id)}>{falla}</option>
                      })
                    }
                  </select> */}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    A Realizar
                  </label>
                  <Controller
                    name="solucion_id"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                      return (
                        <select
                          onChange={onChange}
                          value={value}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                          <option defaultValue={null}></option>
                          {
                            getValues("solutions")?.map(({ id, solucion }) => {
                              return <option key={solucion} value={id}>{solucion}</option>
                            })
                          }
                        </select>
                      )
                    }}
                  />
                  {/* <select {...register("solucion_id", {  })} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option defaultValue={null}></option>
                    {
                      solutions?.filter((solution) => solution.falla_id === parseInt(getValues("falla_id")))
                      .map( ({ id, solucion }) => {
                        return <option key={ solucion } value={ id }>{ solucion }</option>
                      })
                    }
                  </select> */}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Bateria
                  </label>
                  <button
                    className={(getValues("battery") ? "bg-blue-500 " : "bg-blue-300") +
                      " text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={() => {
                      forceUpdate();
                      setValue("battery", !getValues("battery"), { shouldValidate: true })
                    }}
                  >
                    {getValues("battery") ? "Si" : "No"}
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Chip
                  </label>
                  <select {...register("chip", {})} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option defaultValue={null}></option>
                    {
                      chip.map(({ compañia, id }) => {
                        return <option key={compañia} value={parseInt(id)}>{compañia}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    MSD
                  </label>
                  <select {...register("msd", {})} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option defaultValue={null}></option>
                    {
                      msd.map(({ capacidad, id }) => {
                        return (<option key={capacidad} value={parseInt(id)}>
                          {
                            capacidad !== 0
                              ? `${capacidad} GB`
                              : "No"
                          }
                        </option>)
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Cargador
                  </label>
                  <button
                    className={(getValues("charger") ? "bg-blue-500 " : "bg-blue-300") +
                      " text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={() => {
                      forceUpdate();
                      setValue("charger", !getValues("charger"), { shouldValidate: true })
                    }}
                  >
                    {getValues("charger") ? "Si" : "No"}
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pin o Patron
                  </label>
                  <input
                    {...register("pin1")}

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
                    Pin o Patron 2
                  </label>
                  <input
                    {...register("pin2")}

                    type="text"
                    autoComplete="off"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio
                  </label>
                  <input
                    {...register("price", { max: 99999 })}
                    type="number"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Anticipo
                  </label>
                  <input
                    {...register("anticipo")}
                    type="number"
                    disabled={!Boolean(getValues("price"))}
                    // disabled={!Boolean(getValues("price"))}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Resta
                  </label>
                  <input
                    {...register("remain")}
                    disabled
                    type="number"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Inormacion Adicional
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Notas
                  </label>
                  <textarea
                    {...register("notes")}
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-gray-400" />
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
    </div>
  );
}
