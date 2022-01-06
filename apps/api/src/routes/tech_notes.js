export default function (router, pool) {
  
  router.get("/notes/:id", async (req, res) => {

    const { id } = req.params;


    try {
      const query = await pool.query(`SELECT tech_notes.id AS id, created_at, orden_id, tech_id, note, technician.name AS name from tech_notes 
      INNER JOIN technician
        ON technician.id = tech_notes.tech_id
      WHERE orden_id=${id}
      ORDER BY created_at DESC;`)
      
      res.json({
        ok: true,
        res: query,
      })

    } catch (err) {
      console.log(err);
      res.status(422).json({
        ok: false,
        err: err
      });     
    }

  })

  router.post("/notes", async (req, res) => {

    const {
      created_at,
      orden_id,
      tech_id,
      note,
    } = req.body;

    const queryString = `INSERT INTO tech_notes (created_at, orden_id, tech_id, note)
    VALUES (${created_at}, ${orden_id}, ${tech_id}, "${note}");`

    try {
      await pool.query(queryString);
      
      res.json({
        ok: true,
        msg: "Nota creada",
      });
    } catch (err) {
      console.log(err)
      res.status(422).json({
        ok: false,
        err: err
      });
    }

  })
  
  router.delete("/notes/:id", async (req, res) => {

    const { id } = req.params;

    try {
      await pool.query(`DELETE FROM tech_notes WHERE id=${id};`);

      res.json({
        ok: true,
        msg: "Nota borrada",
      });
    } catch (err) {
      console.log(err)
      res.status(422).json({
        ok: false,
        err: err
      });
    }

  })



}