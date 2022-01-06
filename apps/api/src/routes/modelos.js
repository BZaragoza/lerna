import { check, validationResult } from 'express-validator';

export default function (router, pool) {
    router.get("/modelos", async (req, res) => {

        const query = await pool.query('SELECT modelos.id, marca, marca_id, modelo, modelo_num FROM modelos LEFT JOIN marcas ON modelos.marca_id=marcas.id');

        res.send({
            ok: true,
            res: query
        });

    });

    router.get("/modelos/:id", check('id').isNumeric(), async (req, res) => {

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
        const query = await pool.query(`SELECT * FROM modelos WHERE id=${id};`);

        res.json({
            ok: true,
            query: query[0]
        });

    });

    router.post("/modelos", async (req, res) => {

        const { marca_id, modelo, modelo_num="", } = req.body;
        try {
            await pool.query(`INSERT INTO modelos (marca_id, modelo, modelo_num) VALUES (${marca_id}, "${modelo?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}", "${modelo_num?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}" );`);

            const createdModel = await pool.query(`SELECT * from modelos INNER JOIN marcas ON marcas.id=modelos.marca_id WHERE modelo="${req.body.modelo?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}";`)

            res.json({
                ok: true,
                msg: `Modelo guardado.`,
                createdModel: createdModel[0]
            });

        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }
    });

    router.put("/modelos/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;
        const { marca_id, modelo, modelo_num } = req.body;

        const modelToUpdate = {
            marca_id,
            modelo: modelo?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            modelo_num: modelo_num?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        }

        try {
            await pool.query(`UPDATE modelos SET ? WHERE id=${id}`, modelToUpdate);

            const updatedModel = await pool.query(`SELECT modelos.id AS id, marca, marca_id, modelo, modelo_num from modelos INNER JOIN marcas ON marcas.id=modelos.marca_id WHERE modelo="${modelo}";`)

            res.json({
                ok: true,
                msg: 'Modelo actualizado.',
                updatedModel: updatedModel[0]
            });

        } catch (err) {

            res.status(400).json({
                ok: false,
                err
            })
        }
    });

    router.delete("/modelos/:id", check('id').isNumeric(), async (req, res) => {

        const { id } = req.params;

        try {
            const query = await pool.query(`DELETE FROM modelos WHERE id=${id};`)
            
            res.json({
                ok: true,
                msg: 'Marca borrada.'
            });
        } catch (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        
    });
}