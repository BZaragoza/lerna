export default function (router, pool) {

    router.get("/soluciones", async (req, res) => {

        try {

            const query = await pool.query('SELECT soluciones.id, falla_id, fallas.falla, solucion, soluciones.descripcion FROM soluciones INNER JOIN fallas ON soluciones.falla_id=fallas.id;')

            res.json({
                ok: true,
                res: query
            });

        } catch (err) {

            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            })

        }
    });

    router.get('/soluciones/:id', async (req, res) => {

        try {
            const { id } = req.params;
            const query = await pool.query(`SELECT * FROM soluciones WHERE id=${id};`);

            res.json({
                ok: true,
                query: query[0]
            })

        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }

    });

    router.post("/soluciones", async (req, res) => {

        const solToSave = [
            req.body.falla_id || null, 
            req.body.solucion || null, 
            req.body.descripcion || null
        ]

        const queryString = `INSERT INTO soluciones (falla_id, solucion, descripcion) VALUES (?, ?, ?);`
        
        try {

            await pool.query(queryString, solToSave)

            res.json({
                ok: true,
                msg: "Solución creada"
            })

        } catch (err) {

            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            })

        }

    })

    router.put('/soluciones/:id', async (req, res) => {

        const { id } = req.params;
        const { falla_id, solucion, descripcion } = req.body;
        const solToUpdate = {
            falla_id,
            solucion,
            descripcion
        }
        
        try {

            await pool.query(`UPDATE soluciones SET ? WHERE id=${id}`, solToUpdate)
            
             res.json({
                 ok: true,
                 msg: "Solución actualizada."
             });

        } catch (err) {

            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            })

        }

    });

    router.delete('/soluciones/:id', async (req, res) => {

        const { id } = req.params;

        try {
            pool.query(`DELETE FROM soluciones WHERE id=${id}`)

            res.json({
                ok: true,
                msg: "Solución borrada."
            });
        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            })
        }

    });


}
