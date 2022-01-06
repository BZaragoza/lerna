import { check, validationResult } from 'express-validator';
import { getNextFolio } from '../utils/utils.js';

export default function (router, pool) {

    router.get("/folio", async (req, res) => {

        try {
            const query = await pool.query("SELECT folio FROM orden_servicio ORDER BY folio DESC LIMIT 1;");
            let folio = query[0]?.folio

            !folio
                ? (res.json({
                    ok: true,
                    folio: getNextFolio("0000")
                }))
                : (res.json({
                    ok: true,
                    folio: getNextFolio(folio)
                }))

        } catch (error) {
            res.status(500).json({
                ok: false,
                error
            })
        }
    })

    router.get("/orden", async (req, res) => {

            const query = await pool.query(`SELECT orden_servicio.id, orden_servicio.client_id, orden_servicio.marca_id, orden_servicio.modelo_id AS modelo_id,
            orden_servicio.solucion_id AS solucion_id, orden_servicio.falla_id AS falla_id, encendido, receptionDate, deadlineDate, folio, nombre, 
            apellido_paterno, apellido_materno, clientes.telefono1, clientes.telefono2, marcas.marca, modelos.modelo, modelo_num, phone_color, dejo, 
            fallas.falla, soluciones.solucion, battery, compañia, chip, msd, capacidad, charger, price, anticipo, remain, deadlineDate, pin1, pin2, notes, 
            status, status_id, color, device_id, device, technician_id, technician.name AS technician
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
            INNER JOIN status
                ON status.id = orden_servicio.status_id
            LEFT JOIN devices
                ON devices.id = orden_servicio.device_id
            INNER JOIN technician
                ON technician.id = orden_servicio.technician_id
            ORDER BY folio DESC
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
        const query = await pool.query(`SELECT orden_servicio.id, orden_servicio.client_id AS client_id, orden_servicio.marca_id AS marca_id, orden_servicio.modelo_id AS modelo_id, orden_servicio.solucion_id AS solucion_id, 
        orden_servicio.falla_id AS falla_id, encendido, receptionDate, deadlineDate, folio, nombre, apellido_paterno, apellido_materno, clientes.telefono1, clientes.telefono2, 
        marcas.marca, modelos.modelo, dejo, fallas.falla, soluciones.solucion, battery, compañia, chip, msd, capacidad, charger, price, anticipo, remain, deadlineDate, pin1, pin2, notes,
        status.id AS status_id, devices.id AS device_id, color, technician_id
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
            INNER JOIN status
                ON status.id = orden_servicio.status_id
            INNER JOIN devices
                ON devices.id = orden_servicio.device_id
            WHERE orden_servicio.id=${id}
            ORDER BY receptionDate DESC
        ;`);


        res.json({
            ok: true,
            query: query[0]
        });

    });

    router.put("/orden/update-state/:orderId", check('orderId').isNumeric(), async (req, res) => {

        // Parte para los errores, el middleware agrega
        // los errores, si hay hace el return
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                ok: false,
                errors: errors.array()
            })
        }

        const { orderId=null } = req.params
        const { statusId=null } = req.body

        try {
            await pool.query(`UPDATE orden_servicio SET status_id=${ statusId } WHERE id=${orderId} `);

            res.json({
                ok: true,
                msg: 'Estado actualizado'
            })
        } catch (err) {
            console.log(err)
            res.status(422).json({
                ok: false,
                err: err
            });
        }

        
    })

    

    router.post("/orden", async (req, res) => {
        
        const {
            folio, receptionDate, deadlineDate, client_id, marca_id, modelo_id, phone_color,
            dejo, encendido, falla_id, solucion_id, battery, chip, msd, charger, pin1, pin2, price,
            anticipo, remain, notes, status_id, device_id, technician_id
        } = req.body;
        
        const queryString = `INSERT INTO orden_servicio (folio, receptionDate, deadlineDate, client_id, 
            marca_id, modelo_id, phone_color, dejo, encendido, falla_id, solucion_id, battery, chip, msd, charger, 
            pin1, pin2, price, anticipo, remain, notes, status_id, device_id, technician_id) 
            VALUES (${folio ? `\"${folio?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\"`: null }, 
            ${receptionDate}, ${deadlineDate}, ${client_id}, ${marca_id}, ${modelo_id}, ${phone_color ? `"${phone_color}"` : null}, ${dejo || true }, ${encendido || true }, 
            ${falla_id}, ${solucion_id}, ${battery || true}, ${chip}, ${msd}, ${charger || false}, 
            ${pin1 ? `\"${pin1.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\"`: null }, 
            ${pin2 ? `\"${pin2.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\"`: null }, 
            ${price}, ${anticipo}, ${remain},${notes ? `\"${notes.toUpperCase()}\"`: null }, 
            ${status_id}, ${device_id}, ${technician_id});`

        try {
            await pool.query(queryString);

            const createdOrder = await pool.query(`SELECT orden_servicio.id, orden_servicio.client_id AS client_id, orden_servicio.marca_id AS marca_id, orden_servicio.modelo_id AS modelo_id, orden_servicio.solucion_id AS solucion_id, 
            orden_servicio.falla_id AS falla_id, encendido, receptionDate, deadlineDate, folio, nombre, apellido_paterno, apellido_materno, clientes.telefono1, clientes.telefono2, 
            marcas.marca, modelos.modelo, modelos.modelo_num, phone_color, dejo, fallas.falla, soluciones.solucion, battery, compañia, chip, msd, capacidad, charger, price, anticipo, remain, deadlineDate, pin1, pin2, notes, status,
            status.id AS status_id, devices.id AS device_id, device, color, technician_id, name AS technician
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
                INNER JOIN status
                    ON status.id = orden_servicio.status_id
                INNER JOIN devices
                    ON devices.id = orden_servicio.device_id
                INNER JOIN technician
                    ON technician.id = orden_servicio.technician_id
                WHERE receptionDate=${req.body.receptionDate || null}
                ORDER BY receptionDate DESC `)

            res.json({
                ok: true,
                msg: "Orden creada",
                createdOrder: createdOrder[0],
            });

        } catch (err) {
            console.log(err)
            res.status(422).json({
                ok: false,
                err: err
            });
        }
    });

    router.put("/orden/:id", check('id').isNumeric(), async (req, res) => {

        console.log(req.body)

        const { id } = req.params;
        const { folio, receptionDate, status_id, deadlineDate, client_id, marca_id, modelo_id, phone_color, dejo, encendido, falla_id, solucion_id, device_id, battery, chip, msd, charger, pin1, pin2, price, anticipo, remain, notes, technician_id } = req.body;


        const queryString = `UPDATE orden_servicio SET
        folio="${folio?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ''}",
        receptionDate=${receptionDate},
        deadlineDate=${deadlineDate},
        client_id=${client_id},
        device_id=${device_id || null},
        marca_id=${marca_id},
        modelo_id=${modelo_id},
        phone_color=${phone_color ? `"${phone_color}"` : null},
        dejo=${dejo},
        encendido=${encendido},
        falla_id=${falla_id},
        solucion_id=${solucion_id},
        battery=${battery},
        chip=${chip},
        msd=${msd},
        price=${price},
        anticipo=${anticipo},
        remain=${remain},
        status_id=${status_id},
        charger=${charger},
        pin1=${pin1 ? `"${pin1}"` : null},
        pin2=${pin2 ? `"${pin2}"` : null},
        technician_id=${technician_id},
        notes="${notes?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ''}"
        WHERE id=${id};
        `

        console.log(queryString)

        try {

            await pool.query(queryString);

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
                msg: 'Orden borrada.'
            });

        } catch (err) {

            res.status(422).json({
                ok: false,
                err
            })

        }

    });
}
