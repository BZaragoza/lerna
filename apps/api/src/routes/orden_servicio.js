import { check, validationResult  } from 'express-validator';
import { getNextFolio } from '../utils/utils.js';

export default function(router, pool) {
    
    router.get("/folio", async (req, res) => {
        
        try {
            const query = await pool.query("SELECT folio FROM orden_servicio ORDER BY folio DESC LIMIT 1;");
            let folio = query[0]?.folio
            
            if (!folio) {
               
                res.json({
                    ok: true,
                    folio: ""
                })

            } else {
                const newFolio = getNextFolio(folio)

                res.json({
                    ok: true,
                    folio: newFolio
                })
            }
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                error
            })
        }
    })

    router.get("/orden", async (req, res) => {
         
        const query = await pool.query(`SELECT orden_servicio.id, orden_servicio.client_id, orden_servicio.marca_id, orden_servicio.modelo_id AS modelo_id, orden_servicio.solucion_id AS solucion_id, orden_servicio.falla_id AS falla_id, encendido, receptionDate, deadlineDate, folio, 
        nombre, apellido_paterno, apellido_materno, orden_servicio.telefono1, orden_servicio.telefono2, marcas.marca, modelos.modelo, dejo, fallas.falla, soluciones.solucion, battery, compañia, chip, msd, capacidad, charger, price, anticipo, remain, deadlineDate, pin1, pin2, notes, status
            FROM orden_servicio 
            INNER JOIN clientes 
                ON clientes.id = orden_servicio.client_id 
            INNER JOIN marcas 
                ON marcas.id =  orden_servicio.marca_id
            INNER JOIN modelos
                ON modelos.id = orden_servicio.modelo_id
            INNER JOIN fallas 
                ON fallas.id = orden_servicio.falla_id
            INNER JOIN soluciones 
                ON soluciones.id = orden_servicio.solucion_id
            INNER JOIN chip 
                ON chip.id = orden_servicio.chip
            INNER JOIN msd 
                ON msd.id = orden_servicio.msd
            ORDER BY receptionDate DESC
        ;`);

        res.send({
            ok: true,
            res: query
        });
    
    });
    
    router.get("/orden/:id", check('id').isNumeric(), async (req, res) => {
    
        // Parte para los errores, el middleware agrega
        // los errores, si hay hace el return
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                 ok: false,
                 errors: errors.array() 
            })
        }
    
        // Typical request processing
        const { id } = req.params;
        const query = await pool.query(`SELECT orden_servicio.id, orden_servicio.client_id, orden_servicio.marca_id AS marca_id, orden_servicio.modelo_id AS modelo_id, orden_servicio.solucion_id AS solucion_id, orden_servicio.falla_id AS falla_id, encendido, receptionDate, deadlineDate, folio, nombre, apellido_paterno, apellido_materno, orden_servicio.telefono1, orden_servicio.telefono2, marcas.marca, modelos.modelo, dejo, fallas.falla, soluciones.solucion, battery, compañia, chip, msd, capacidad, charger, price, anticipo, remain, deadlineDate, pin1, pin2, notes
            FROM orden_servicio 
            INNER JOIN clientes 
                ON clientes.id = orden_servicio.client_id 
            INNER JOIN marcas 
                ON marcas.id =  orden_servicio.marca_id
            INNER JOIN modelos
                ON modelos.id = orden_servicio.modelo_id
            INNER JOIN fallas 
                ON fallas.id = orden_servicio.falla_id
            INNER JOIN soluciones 
                ON soluciones.id = orden_servicio.solucion_id
            INNER JOIN chip 
                ON chip.id = orden_servicio.chip
            INNER JOIN msd 
                ON msd.id = orden_servicio.msd
            WHERE orden_servicio.id=${id}
            ORDER BY receptionDate DESC
        ;`);

    
        res.json({
            ok: true,
            query: query[0]
        });
    
    });
    
    router.post("/orden", async (req, res) => {
        req.body.telefono2 = req.body.telefono2 === "null" ? null : req.body.telefono2
        const { folio, receptionDate, deadlineDate, client_id, telefono1, telefono2, marca_id, modelo_id, dejo, encendido, falla_id, solucion_id, battery, chip, msd, charger, pin1, pin2, price, anticipo, remain, notes, status } = req.body
        
        const queryString = `INSERT INTO orden_servicio (folio, receptionDate, deadlineDate, client_id, telefono1, telefono2, marca_id, modelo_id, dejo, encendido, falla_id, solucion_id, battery, chip, msd, charger, pin1, pin2, price, anticipo, remain, notes, status) VALUES (\"${folio}\", \"${receptionDate}\", \"${deadlineDate}\", ${client_id}, \"${telefono1}\", \"${telefono2}\", ${marca_id}, ${modelo_id}, ${dejo}, ${encendido}, ${falla_id}, ${solucion_id}, ${battery}, ${chip}, ${msd}, ${charger}, \"${pin1}\", \"${pin2}\", ${price}, ${anticipo}, ${remain}, \"${notes}\", \"${status}\");`
        
        try {       
            await pool.query(queryString);
            res.json({
                ok: true,
                msg: "Orden creada"
            });
    
        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err
            });
        }
    });
    
    router.put("/orden/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;
        const { folio, receptionDate, deadlineDate, client_id, telefono1, telefono2, marca_id, modelo_id, dejo, encendido, falla_id, solucion_id, battery, chip, msd, charger, pin1, pin2, price, anticipo, remain, notes } = req.body;
    
        const clientToUpdate = { id,
            folio,
            receptionDate,
            deadlineDate,
            client_id,
            telefono1,
            telefono2,
            marca_id,
            modelo_id,
            dejo,
            encendido,
            falla_id,
            solucion_id,
            battery,
            chip,
            msd,
            price,
            anticipo,
            remain,
            charger,
            pin1,
            pin2,
            notes 
        }
        
        try {
            await pool.query(`UPDATE orden_servicio SET ? WHERE id=${id}`, clientToUpdate);
    
            res.json({
                ok: true,
                msg: 'Orden actualizada'
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    });
    
    router.delete("/orden/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
    
        try {
            await pool.query(`DELETE FROM orden_servicio WHERE id=${id}`);
    
            res.json({
                ok: true,
                msg: 'Cliente borrado.'
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
    
        }
    
    });
}
