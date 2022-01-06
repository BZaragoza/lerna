import { check, validationResult } from 'express-validator';

export default function (router, pool) {
    router.get("/devices", async (req, res) => {

        const query = await pool.query('SELECT * FROM devices;');

        res.send({
            ok: true,
            res: query
        });

    });

    router.get("/devices/:id", check('id').isNumeric(), async (req, res) => {

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
        const query = await pool.query(`SELECT * FROM devices WHERE id=${id};`);

        res.json({
            ok: true,
            query: query[0]
        });

    });

    router.post("/devices", async (req, res) => {

        const { device } = req.body;

        try {
            await pool.query(`INSERT INTO devices (device) VALUES (?);`, [device.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")]);

            const createdGadget = await pool.query(`SELECT * FROM devices WHERE device=${req.body.device ? "\"" + req.body.device.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null}`)

            res.json({
                ok: true,
                msg: `Equipo guardado.`,
                createdGadget: createdGadget[0]
            });
        } catch (err) {
            if (err.sqlMessage.toLowerCase().includes("duplicate")) {
                res.status(409).json({
                    ok: false,
                    err: "Equipo duplicado"
                })
            } else {
                res.status(422).json({
                    ok: false,
                    err: err.sqlMessage
                })
            }
        }
    });

    router.put("/devices/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;
        const { device } = req.body;


        try {
            await pool.query(`UPDATE devices SET device=? WHERE id=${id}`, [device.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")]);

            res.json({
                ok: true,
                msg: 'Equipo actualizado.'
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            })
        }
    });

    router.delete("/devices/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;

        try {
            await pool.query(`DELETE FROM devices WHERE id=${id}`);

            res.json({
                ok: true,
                msg: 'Equipo borrado.'
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            })
        }

    });
}