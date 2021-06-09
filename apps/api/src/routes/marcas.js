import { check, validationResult  } from 'express-validator';

export default function(router, pool) {
    router.get("/marcas", async (req, res) => {

        const query = await pool.query('SELECT * FROM marcas;');
    
        res.send({
            ok: true,
            res: query
        });
    
    });
    
    router.get("/marcas/:id", check('id').isNumeric(), async (req, res) => {
    
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
        const query = await pool.query(`SELECT * FROM marcas WHERE id=${id};`);
    
        res.json({
            ok: true,
            query: query[0]
        });
    
    });
    
    router.post("/marcas", check('nombre').not().contains('DROP'), async (req, res) => {
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({
            ok: false,
            errors: errors.array() 
        })
        }
    
        const { marca } = req.body;
        
        try {       
            await pool.query(`INSERT INTO marcas (marca) VALUES (?);`, [marca]);
    
            res.json({
                ok: true,
                msg: `Marca guardada.`
            });
    
        } catch (err) {
            res.status(422).json({
                ok: false,
                err: err.sqlMessage
            });
        }
    });
    
    router.put("/marcas/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
        const { marca } = req.body;
        
    
        try {
            await pool.query(`UPDATE marcas SET marca=? WHERE id=${id}`, [marca]);
    
            res.json({
                ok: true,
                msg: 'Marca actualizada.'
            });
    
        } catch (err) {
    
            res.status(400).json({
                ok: false,
                err
            })
        }
    });
    
    router.delete("/marcas/:id", check('id').isNumeric(), async (req, res) => {
    
        const { id } = req.params;
    
        try {
            await pool.query(`DELETE FROM marcas WHERE id=${id}`);
    
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