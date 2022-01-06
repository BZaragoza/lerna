import { check, validationResult } from 'express-validator';

export default function (router, pool) {

    router.get("/clientes", async (req, res) => {
        try {
            const query = await pool.query('SELECT * FROM clientes ORDER BY nombre ASC;');

            res.send({
                ok: true,
                res: query
            });

        } catch (error) {
            res.status(422).json({
                ok: false,
                err: error.sqlMessage
            });
        }

    });

    router.get("/clientes/:id", check('id').isNumeric(), async (req, res) => {

        // Parte para los errores, el middleware agrega
        // los errores, si hay hace el return
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                ok: false,
                errors: errors.array()
            })
        }

        try {

            // Typical request processing
            const { id } = req.params;
            const query = await pool.query(`SELECT * FROM clientes WHERE id=${id};`);

            res.json({
                ok: true,
                query: query[0]
            });

        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }

    });

    router.post("/clientes", async (req, res) => {

        const clientToSave = [
            req.body.nombre?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
            req.body.apellido_paterno?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
            req.body.apellido_materno?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
            req.body.telefono1?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
            req.body.telefono2?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
            req.body.notas?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null
        ]

        const queryString = `INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, telefono1, telefono2, notas) VALUES (?, ?, ?, ?, ?, ?);`

        pool.query(queryString, clientToSave)
            .then(async () => {

                const createdClient = await pool.query(`SELECT * from clientes WHERE nombre="${req.body.nombre}";`)

                res.json({
                    ok: true,
                    msg: `Cliente ${req.body.nombre} guardado.`,
                    createdClient: createdClient[0]
                });
            })
            .catch(err => {
                res.status(422).json({
                    ok: false,
                    err
                })
            })
    });

    router.put("/clientes/:id", check('id').isNumeric(), async (req, res) => {

        /*

            INSERT INTO clientes (nombre, num_telefono) VALUES('Brian Zaragoza', '6142214217')
            ON DUPLICATE KEY UPDATE num_telefono = VALUES(num_telefono)

        */

        const { id } = req.params;
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            telefono1,
            telefono2,
            notas
        } = req.body;

        // ACTUALIZAR A ALGO ASÍ COMO: const clientToUpdate = req.body;
        // TENER CUIDADO CON LAS VALIDACIONES
        try {
            const queryString = `UPDATE clientes SET 
                nombre=\"${nombre?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}\", 
                apellido_paterno=\"${apellido_paterno?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ''}\",
                apellido_materno=${apellido_materno ? "\"" + apellido_materno?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null},
                telefono1=${telefono1 ? "\"" + telefono1?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null},
                telefono2=${telefono2 ? "\"" + telefono2?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null},
                notas=${notas ? "\"" + notas?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null} 
                WHERE id=${id}`;

            await pool.query(queryString);
            const updatedClient = await pool.query(`SELECT * from clientes WHERE id=${id}`)

            res.json({
                ok: true,
                msg: 'Cliente actualizado.',
                updatedClient: updatedClient[0]
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            });
        }
    });

    router.delete("/clientes/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;

        try {
            await pool.query(`DELETE FROM clientes WHERE id=${id}`);

            res.json({
                ok: true,
                msg: 'Cliente borrado.'
            });

        } catch (err) {
            console.log(err)
            if (err.sqlMessage.includes('foreign key constraint fails')) {
                res.status(200).json({
                    ok: false,
                    err: 'Hay modelos dependientes de esta marca'
                })
            } else {
                res.status(422).json({
                    ok: false,
                    err: err.sqlMessage
                })
            }
        }

    });
}
