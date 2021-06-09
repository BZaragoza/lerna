import { check, validationResult  } from 'express-validator';

export default function(router, pool) {

    router.get("/chip", async (req, res) => {

        const query = await pool.query('SELECT * FROM chip ORDER BY compañia;');
    
        res.send({
            ok: true,
            res: query
        });
    
    });
    
    router.get("/chip/:id", check('id').isNumeric(), async (req, res) => {
    
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
        const query = await pool.query(`SELECT * FROM chip WHERE id=${id};`);
    
        res.json({
            ok: true,
            query: query[0]
        });
    
    });
    
    router.post("/chip", check('nombre').not().contains('DROP'), async (req, res) => {
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({
            ok: false,
            errors: errors.array() 
        })
        }
    
        const { compañia } = req.body;
        
        try {       
            await pool.query(`INSERT INTO chip (compañia) VALUES (?);`, [compañia]);
    
            res.json({
                ok: true,
                msg: `Compañia guardado.`
            });
    
        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }
    });
    
    router.put("/chip/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
        const { compañia } = req.body;
    
        try {
            await pool.query(`UPDATE chip SET ? WHERE id=${id}`, {compañia});
    
            res.json({
                ok: true,
                msg: "Compañia actualizada."
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    });
    
    router.delete("/chip/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
    
        try {
            await pool.query(`DELETE FROM chip WHERE id=${id}`);
    
            res.json({
                ok: true,
                msg: "Compañia borrado."
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    
    });

}
