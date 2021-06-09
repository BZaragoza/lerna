import { check, validationResult  } from 'express-validator';

export default function(router, pool) {
    router.get("/msd", async (req, res) => {

        const query = await pool.query('SELECT * FROM msd ORDER BY capacidad;');
    
        res.send({
            ok: true,
            res: query
        });
    
    });
    
    router.get("/msd/:id", check('id').isNumeric(), async (req, res) => {
    
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
        const query = await pool.query(`SELECT * FROM msd WHERE id=${id};`);
    
        res.json({
            ok: true,
            query: query[0]
        });
    
    });
    
    router.post("/msd", check('nombre').not().contains('DROP'), async (req, res) => {
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({
            ok: false,
            errors: errors.array() 
        })
        }
    
        const { capacidad } = req.body;
        
        try {       
            await pool.query(`INSERT INTO msd (capacidad) VALUES (?);`, [capacidad]);
    
            res.json({
                ok: true,
                msg: `MSD guardada.`
            });
    
        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }
    });
    
    router.put("/msd/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
        const { capacidad } = req.body;
        
        try {
            await pool.query(`UPDATE msd SET ? WHERE id=${id}`, {capacidad});
    
            res.json({
                ok: true,
                msg: 'MSD actualizada.'
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    });
    
    router.delete("/msd/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
    
        try {
            await pool.query(`DELETE FROM msd WHERE id=${id}`);
    
            res.json({
                ok: true,
                msg: 'MSD borrada.'
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    
    });
}