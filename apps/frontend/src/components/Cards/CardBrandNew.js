import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brandSchema } from "schemas/schemas";
import InputBoxForm from "components/Forms/InputBoxForm";


export default function CardBrandNew() {

  const { register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: yupResolver(brandSchema)
  })
  
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;
  
  // const [brand, setBrand] = useState({});

  console.log(errors)

  const onSubmit = (data) => {
    return isAddMode
      ? createBrand(data)
      : updateBrand(id, data)
  }

  const createBrand = (newBrand) => {
    fetch("/marcas", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBrand)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        history.goBack()
      })
    
  }
  
  const updateBrand = (id, newBrand) => {

    fetch(`/marcas/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBrand)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        history.goBack()
      })

  }

  useEffect(() => {
    if (!isAddMode) {
      fetch(`/marcas/${id}`)
        .then( res => res.json() )
        .then( ({ query }) => {
          const fields = ["marca"]  
          fields.map(field => setValue(field, query[field]) )
          // setBrand(brand);
        })
    }
   
  }, [id, isAddMode, setValue]);


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">{isAddMode ? "Nueva" : "Editar" } Marca</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mt-6">
              <InputBoxForm register={ register } required large label="Nombre" input="marca" />
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
