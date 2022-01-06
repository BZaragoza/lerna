export default function (router, pool) {

    router.get("/soluciones", async (req, res) => {

        try {

            const query = await pool.query('SELECT soluciones.id, falla_id, fallas.falla, solucion, soluciones.descripcion FROM soluciones INNER JOIN fallas ON soluciones.falla_id=fallas.id ORDER BY falla;')

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
            req.body.solucion?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null, 
            req.body.descripcion?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null
        ]

        const queryString = `INSERT INTO soluciones (falla_id, solucion, descripcion) VALUES (?, ?, ?);`
        
        try {

            await pool.query(queryString, solToSave)

            const solutionCreated = await pool.query(`SELECT soluciones.id AS id, falla, falla_id, solucion, soluciones.descripcion FROM soluciones INNER JOIN fallas ON fallas.id=soluciones.falla_id WHERE solucion="${req.body.solucion}";`)

            res.json({
                ok: true,
                msg: "Solución creada",
                solutionCreated: solutionCreated[0]
            })

        } catch (err) {

            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            })

        }

    })

    router.put('/soluciones/:id', async (req, res) => {

        console.log(req.body)

        const { id } = req.params;
        const { falla_id, solucion, descripcion } = req.body;
        const solToUpdate = {
            falla_id: falla_id,
            solucion: solucion.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            descripcion: descripcion?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        }
        
        // try {

            const queryString = `UPDATE soluciones SET 
                falla_id=${falla_id},
                solucion=${solucion ? `"${solucion}"` : null},
                descripcion=${descripcion ? `"${descripcion}"` : null}
                WHERE id=${id}`

            await pool.query(queryString);

            const updatedSolution = await pool.query(`SELECT soluciones.id AS id, solucion, falla, fallas.id AS falla_id, soluciones.descripcion FROM soluciones 
                            INNER JOIN fallas ON fallas.id=soluciones.falla_id WHERE soluciones.id=${id}`);
            
             res.json({
                 ok: true,
                 msg: "Solución actualizada.",
                 updatedSolution: updatedSolution[0]
             });

        // } catch (err) {

        //     res.status(422).json({
        //         ok: false,
        //         err: err.sqlMessage
        //     })

        // }

    });

    router.delete('/soluciones/:id', async (req, res) => {

        const { id } = req.params;

        try {
            const query = await pool.query(`DELETE FROM soluciones WHERE id=${id}`);

            console.log(query)

            res.json({
                ok: true,
                msg: "Solución borrada."
            });
        } catch (err) {
            console.log(err)
            res.status(409).json({
                ok: false,
                err: err.sqlMessage
            })
        }

    });


}
