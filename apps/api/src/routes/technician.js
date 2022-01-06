import { check, validationResult } from 'express-validator';

export default function (router, pool) {

  router.get("/technician", async (req, res) => {
    try {
      const query = await pool.query('SELECT id, name FROM technician;');

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

  router.get("/technician/:id", check('id').isNumeric(), async (req, res) => {

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
      const query = await pool.query(`SELECT id, name, email FROM technician WHERE id=${id};`);

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

  router.post("/technician", async (req, res) => {

    const { name, } = req.body;
    const queryString = `INSERT INTO technician (name) VALUES (?);`

    try {

      await pool.query(queryString, [name?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),]);

      const createdTech = await pool.query(`SELECT * FROM technician WHERE name="${req.body.name ? req.body.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ''}";`)

      res.json({
        ok: true,
        msg: `${name?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} fue guardado.`,
        createdTech: createdTech[0],
      });

    } catch (err) {

      if (err.sqlMessage?.toLowerCase().includes("duplicate")) {
        res.status(409).json({
          ok: false,
          err: "Técnico duplicado"
        })
      } else {
        res.status(422).json({
          ok: false,
          err: err.sqlMessage
        })
      }

    }

  });

  router.put("/technician/:id", check('id').isNumeric(), async (req, res) => {

    /*

        INSERT INTO status (nombre, num_telefono) VALUES('Brian Zaragoza', '6142214217')
        ON DUPLICATE KEY UPDATE num_telefono = VALUES(num_telefono)

    */

    const { id } = req.params;
    const {
      name,
      email,
    } = req.body;

    // ACTUALIZAR A ALGO ASÍ COMO: const clientToUpdate = req.body;
    // TENER CUIDADO CON LAS VALIDACIONES

    try {
      const queryString = `UPDATE technician SET name=\"${name}\" WHERE id=${id}`;

      await pool.query(queryString);

      res.json({
        ok: true,
        msg: 'Técnico actualizado.'
      });

    } catch (err) {

      if (err.sqlMessage?.toLowerCase().includes("duplicate")) {
        res.status(409).json({
          ok: false,
          err: "Técnico duplicado"
        })
      } else {
        res.status(422).json({
          ok: false,
          err: err.sqlMessage
        })
      }
    }
  });

  router.delete("/technician/:id", check('id').isNumeric(), async (req, res) => {

    const { id } = req.params;

    try {
      await pool.query(`DELETE FROM technician WHERE id=${id}`)

      res.json({
        ok: true,
        msg: 'Técnico borrado.'
      });
    } catch (err) {
      console.log(err)
      
      res.status(409).json({
        ok: false,
        err
      })
    }

  });
}
