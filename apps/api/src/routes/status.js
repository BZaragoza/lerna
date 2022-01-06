import { check, validationResult } from 'express-validator';

export default function (router, pool) {

  router.get("/status", async (req, res) => {
    try {
      const query = await pool.query('SELECT * FROM (SELECT status.id AS id, status, color, IFNULL(COUNT(orden_servicio.status_id), 0) AS count FROM status LEFT JOIN orden_servicio ON status.id=orden_servicio.status_id GROUP BY LOWER(`status`)) AS tmp_table ORDER BY status;');

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

  router.get("/status/:id", check('id').isNumeric(), async (req, res) => {

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
      const query = await pool.query(`SELECT * FROM status WHERE id=${id};`);

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

  router.post("/status", async (req, res) => {
    const statusToSave = [
      req.body.status?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
      req.body.color?.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null,
    ]

    console.log(statusToSave)

    const queryString = `INSERT INTO status (status, color) VALUES (?, ?);`

    try {
      await pool.query(queryString, statusToSave)

      const createdStatus = await pool.query(`SELECT * FROM (SELECT status.id AS id, status, color, IFNULL(COUNT(orden_servicio.status_id), 0) AS count FROM status LEFT JOIN orden_servicio ON status.id=orden_servicio.status_id GROUP BY LOWER(\`status\`)) AS tmp_table WHERE status=${req.body.status ? "\"" + req.body.status + "\"" : null}`)

      res.json({
        ok: true,
        msg: `${req.body.status} fue guardado.`,
        createdStatus: createdStatus[0]
      });

    } catch (err) {
      
      if ( err.sqlMessage.toLowerCase().includes("duplicate") ) {
        res.status(409).json({
          ok: false,
          err: "Estado duplicado"
        })
      } else {
        res.status(422).json({
          ok: false,
          err: err.sqlMessage
        })
      }

    }
  });

  router.put("/status/:id", check('id').isNumeric(), async (req, res) => {

    /*

        INSERT INTO status (nombre, num_telefono) VALUES('Brian Zaragoza', '6142214217')
        ON DUPLICATE KEY UPDATE num_telefono = VALUES(num_telefono)

    */

    const { id } = req.params;
    const {
      status,
      color
    } = req.body;

    // ACTUALIZAR A ALGO ASÍ COMO: const clientToUpdate = req.body;
    // TENER CUIDADO CON LAS VALIDACIONES
    
    try {
      const queryString = `UPDATE status SET 
          status=${status ? "\"" + status.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null}, 
          color=${color ? "\"" + color.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\"" : null} 
          WHERE id=${id}`;

      const query = await pool.query(queryString);

      res.json({
        ok: true,
        msg: 'Status actualizado.'
      });

    } catch (err) {

      res.status(400).json({
        ok: false,
        err
      });
    }
  });

  router.delete("/status/:id", check('id').isNumeric(), async (req, res) => {

    const { id } = req.params;

    try {
      await pool.query(`DELETE FROM status WHERE id=${id}`)  

      res.json({
        ok: true,
        msg: 'Status borrado.'
      });

    } catch (err) {
        res.status(422).json({
          ok: false,
          err: err.sqlMessage
        })
    }

  });
}
