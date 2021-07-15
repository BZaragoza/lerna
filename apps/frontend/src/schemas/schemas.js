import * as Yup from 'yup';

const PHONE_NO_REGEX = /^[0-9\- ]{10,14}$/

export const orderSchema = Yup.object().shape({
    folio: Yup.string().required("Folio es requerido").min(5, "Folio inválido"),
    receptionDate: Yup.string().required("Fecha de recepción es requerida").min(10, "Fecha inválida"),
    deadlineDate: Yup.string().required("Fecha de entrega es requerida").min(10, "Fecha inválida"),
    
    client_id: Yup.number().required("Cliente es requerido").positive("Cliente inválido").integer("Cliente inválido"),
    telefono1: Yup.string().required("Teléfono 1 es requerido")
        .matches(PHONE_NO_REGEX, {message: "Teléfono inválido", excludeEmptyString:true}),
    telefono2: Yup.string().matches(PHONE_NO_REGEX, {message: "Teléfono inválido", excludeEmptyString:true}).nullable(true),
    
    marca_id: Yup.number().required("Marca es requerida").positive("Marca inválida").integer("Marca inválida"),
    modelo_id: Yup.number().required("Modelo es requerido").positive("Modelo inválido").integer("Modelo inválido"),
    
    dejo: Yup.boolean(),
    encendido: Yup.boolean(),
    battery: Yup.boolean(),
    charger: Yup.boolean(),
    
    falla_id: Yup.number().required("Falla es requerida").positive("Marca inválida").integer("Marca inválida"),
    solucion_id: Yup.number().required("Solución es requerida").positive("Solución inválida").integer("Solución inválida"),

    chip: Yup.number().required().positive("Compañia inválida").integer("Compañia inválida").typeError("Compañia es requerida"),
    msd: Yup.number().required().positive("MSD inválida").integer("MSD inválida").typeError("MSD es requerida"),
    
    price: Yup.number().required("Precio es requerido").positive("Precio inválido").integer("Precio inválido"),
    anticipo: Yup.number().required("Anticipo es requerido").positive("Anticipo inválido").integer("Anticipo inválido"),
    remain: Yup.number().typeError("Resta inválida").positive("Verifica tu operación").integer("Resta inválido").required("Resta es requerido"),
    
    pin1: Yup.string().notRequired(),
    pin2: Yup.string().notRequired(),
    notes: Yup.string().notRequired().nullable(true),
});

export const clientSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido")
        .min(3, "Nombre inválido"),

    apellido_paterno: Yup.string().required("Apellido es requerido")
        .min(3, "Apellido inválido"),

    apellido_materno: Yup.string().notRequired(),

    telefono1: Yup.string().required("Teléfono 1 es requerido")
        .matches(PHONE_NO_REGEX, {message: "Teléfono inválido", excludeEmptyString:true}),
        
    telefono2: Yup.string().notRequired(),
        // .matches(PHONE_NO_REGEX, {message: "Teléfono inválido", excludeEmptyString:false}),

    notas: Yup.string().notRequired()
})

export const brandSchema = Yup.object().shape({
    marca: Yup.string().required("Marca es requerido")
        .min(3, "Marca inválida")
})

export const modelSchema = Yup.object().shape({
    marca_id: Yup.number().required().positive("Marca inválida").integer("Marca inválida").typeError("Marca es requerido"),
    
    modelo: Yup.string().required("Modelo es requerido"),
    
    modelo_num: Yup.string()
})

export const faultSchema = Yup.object().shape({
    falla: Yup.string().required("Falla es requerido"),
    descripcion: Yup.string().notRequired()
})

export const solutionSchema = Yup.object().shape({
    falla_id: Yup.number().required().positive().integer("Falla inválida").typeError("Falla es requerido"),
    solucion: Yup.string().required("Solución es requerido")
        .min(3, "Solución inválida"),
    descripcion: Yup.string().notRequired()
})

export const simSchema = Yup.object().shape({
    compañia: Yup.string().required("Compañia es requerido")
        .min(2, "Compañia inválida")
});

export const msdSchema = Yup.object().shape({
    capacidad: Yup.number().required().positive().integer().typeError("Capacidad no válida")
});


