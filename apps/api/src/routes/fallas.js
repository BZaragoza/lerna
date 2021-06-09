import { check, validationResult } from 'express-validator';

export default function (router, pool) {

    router.get("/fallas", async (req, res) => {

        const query = await pool.query('SELECT * FROM fallas');

        res.send({
            ok: true,
            res: query
        });

    });

    router.get("/fallas/:id", check('id').isNumeric(), async (req, res) => {

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
        const query = await pool.query(`SELECT * FROM fallas WHERE id=${id};`);

        res.json({
            ok: true,
            query: query[0]
        });

    });

    router.post("/fallas",
        [
            check('falla').not().contains('DROP'),
            check('solucion').not().contains('DROP')
        ],

        async (req, res) => {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    ok: false,
                    errors: errors.array()
                })
            }

            const { falla, descripcion } = req.body;

            try {
                await pool.query(`INSERT INTO fallas (falla, descripcion) VALUES (?, ?);`, [falla, descripcion]);

                res.json({
                    ok: true,
                    msg: `Falla registrada.`
                });

            } catch (err) {
                res.status(422).json({
                    ok: false,
                    err: err.sqlMessage
                });
            }
        }
    );

    router.put("/fallas/:id", async (req, res) => {

        const { id } = req.params;
        const { falla, descripcion } = req.body;
        const clientToUpdate = {
            falla,
            descripcion
        }

        try {
            await pool.query(`UPDATE fallas SET ? WHERE id=${id}`, clientToUpdate);

            res.json({
                ok: true,
                msg: 'Cliente actualizado.'
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            })
        }
    }
    );

    router.delete("/fallas/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;

        try {
            await pool.query(`DELETE FROM fallas WHERE id=${id}`);

            res.json({
                ok: true,
                msg: 'Falla borrada.'
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            })

        }

    });
}