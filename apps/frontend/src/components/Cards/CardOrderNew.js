import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";

import { orderSchema } from "schemas/schemas";

import "react-datepicker/dist/react-datepicker.css";


export default function CardOrderNew() {

  const defaultValues = {
    receptionDate: new Date(),
    deadlineDate: new Date(),
    dejo: false,
    encendido: false,
    battery: false,
    charger: false
  }

  const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm({
    defaultValues,
    // resolver: yupResolver(orderSchema)
  })
  console.log(errors)
  // for (const error in errors) {
  //   console.log(errors[error].message)
  // }

  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  const [msd, setMsd] = useState([]);
  const [chip, setChip] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [faults, setFaults] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [clients, setClients] = useState([]);


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

    
  }, [setValue]);
  

  const onSubmit = (data) => {
    delete data.models
    delete data.solutions
    data.remain = data.price - data.anticipo
    data.receptionDate = new Date(data.receptionDate).toISOString().replace("T", " ").substring(0,19)
    data.deadlineDate = new Date(data.deadlineDate).toISOString().replace("T", " ").substring(0,19)
    
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
        history.goBack()
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
        history.goBack()
      })
  }
  
  const price = watch("price");
  const anticipo = watch("anticipo");
  const client_id = watch("client_id");
  const marca_id = watch("marca_id");
  const falla_id = watch("falla_id");

  useEffect(() => {
    const remain = price-anticipo
    setValue("remain", remain, { shouldDirty: true })
  }, [price, anticipo, setValue]);

  const handleClientsChange = () => {
    if ( client_id ){
      const { telefono1, telefono2 } = clients.filter(client => client.id === parseInt(client_id) )[0]
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
        .then(res => res.json() )
        .then(({ query }) => {
          query.receptionDate = new Date(query.receptionDate)
          query.deadlineDate = new Date(query.deadlineDate)
          const fields = ["folio", "receptionDate", "deadlineDate", "client_id", "telefono1", "telefono2", "marca_id", "modelo_id", "dejo", "encendido", "falla_id", "solucion_id", "battery", "chip", "msd", "charger", "pin1", "pin2", "price", "anticipo", "remain", "notes"]
          fields.map( field => setValue(field, query[field]))
        })
    } else {
      fetch("/folio")
        .then(res => res.json())
        .then(({ folio }) => setValue("folio", folio))

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
                    {...register("folio", {  })}
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
                    render={({ field: { onChange, value} }) => {
                      return <DatePicker
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={ e => onChange(e)}
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
                        timeFormat="HH:mm"
                        autoComplete="off"
                        timeInputLabel="Hora:"
                        dateFormat="MMMM d, yyyy hh:mm aa"
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
                  render={({ field: { onChange, value} }) => {
                    return <DatePicker
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      onChange={ e => onChange(e)}
                      selected={value}
                      name="deadlineDate"
                      showTimeSelect
                      timeFormat="HH:mm"
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
                      autoComplete="off"
                      timeInputLabel="Hora:"
                      dateFormat="MMMM d, yyyy hh:mm aa"
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
                <select {...register("status")} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                  <option value="Reparar">Reparar</option>
                  <option value="Cotizar">Cotizar</option>
                  <option value="Comprar Pieza">Comprar Pieza</option>
                  <option value="Esperando Refacción">Esperando Refacción</option>
                  <option value="Entregar">Entregar</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Otro Taller">En Otro Taller</option>
                  <option value="Perdido o Comprado">Perdido o Comprado</option>
                </select>
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
                    render={({field: { onChange, value }}) => {
                      return (
                        <select 
                          onClick={handleClientsChange}
                          onChange={onChange} 
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option selected value={null}>{}</option>
                          {
                            clients?.map(({ id, nombre, apellido_paterno, apellido_materno }) => {
                              return <option  key={nombre} value={id}>{nombre} {apellido_paterno} {apellido_materno}</option>
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
                          value={value}
                          type="tel"
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
                          value={value}
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
                    render={({ field: { onChange, value} }) => {
                      return (
                        <select
                          onChange={onChange}
                          onClick={ () => {
                            handleModelsChange()
                            forceUpdate()
                          }}
                          value={value}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option selected value={null}></option>
                          {
                            brands.map( ({ marca, id }) => {
                              return <option 
                                key={marca} 
                                value={parseInt(id, 10)}
                              >{ marca }</option>
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
                {/* <select {...register("modelo_id", {})} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                  <option selected value={null}></option>
                  {
                    getValues("models")?.map( ({ id, modelo }) =>
                      <option 
                        onClick={() => setValue("modelo_id", id)}
                        key={ modelo } 
                        value={ id }
                      >{
                        modelo
                      }</option>
                    )
                    // .filter(model => model.marca_id === parseInt(marca_id))
                  }
                </select> */}
                <Controller
                    name={"modelo_id"}
                    control={control}
                    render={({ field: { onChange, value} }) => {
                      return <select 
                        onChange={onChange} 
                        onClick={ () => {
                          forceUpdate()
                        }}
                        value={value}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                          <option selected value={null}></option>
                          {
                            getValues("models")?.map( ({ id, modelo }) =>
                              <option 
                                onClick={() => setValue("modelo_id", id)}
                                key={ modelo } 
                                value={ id }
                              >{
                                modelo
                              }</option>
                            )
                            // .filter(model => model.marca_id === parseInt(marca_id))
                          }
                        </select>
                      }
                    }
                  />
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
                          onClick={ () => {
                            handleSolutionsChange()
                            forceUpdate()
                          }}
                          value={value}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option selected value={null}></option>
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
                    <option selected value={null}></option>
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
                          <option selected value={null}></option>
                          {
                            getValues("solutions")?.map( ({ id, solucion }) => {
                              return <option key={ solucion } value={ id }>{ solucion }</option>
                            })
                          }
                        </select>
                      )
                    }}
                  />
                  {/* <select {...register("solucion_id", {  })} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option selected value={null}></option>
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
                  <select {...register("chip", {  })} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option selected value={null}></option>
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
                  <select {...register("msd", {  })} className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <option selected value={null}></option>
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
                    {...register("price", {max: 99999})}
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
