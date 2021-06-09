import { check, validationResult } from 'express-validator';

export default function (router, pool) {

    router.get("/clientes", async (req, res) => {
        try {
            const query = await pool.query('SELECT * FROM clientes WHERE activo=1;');

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
            const query = await pool.query(`SELECT * FROM clientes WHERE activo=1 AND id=${id};`);

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
            req.body.nombre || null, 
            req.body.apellido_paterno || null, 
            req.body.apellido_materno || null, 
            req.body.telefono1 || null, 
            req.body.telefono2 || null, 
            req.body.notas || null
        ]

        const queryString = `INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, telefono1, telefono2, notas) VALUES (?, ?, ?, ?, ?, ?);`

        pool.query(queryString, clientToSave)
            .then( () => {
                res.json({
                    ok: true,
                    msg: `Cliente ${req.body.nombre} guardado.`
                });
            })
            .catch( (err) => {
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
            const queryString = `UPDATE clientes SET nombre=\"${nombre}\", apellido_paterno=\"${apellido_paterno}\", apellido_materno=${apellido_materno ? "\""+apellido_materno+"\"" : null}, telefono1=${telefono1 ? "\""+telefono1+"\"" : null}, telefono2=${telefono2 ? "\""+telefono2+"\"" : null}, notas=${notas ? "\""+notas+"\"" : null} WHERE id=${id}`;
            // console.log(queryString)
            const query = await pool.query(queryString);
            console.log(query)
            res.json({
                ok: true,
                msg: 'Cliente actualizado.'
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

        pool.query(`UPDATE clientes SET activo=0 WHERE id=${id}`)
            .then(() => {
                res.json({
                    ok: true,
                    msg: 'Cliente borrado.'
                });
            })
            .catch(err => {
                res.status(400).json({
                    ok: false,
                    err
                })
            })

    });
}
