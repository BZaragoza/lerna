import { DateTime } from "luxon";

export default function(router, pool) {

  router.post('/cards', async (req, res) => {

    const { status=[] } = req.body;

    const selectedStatus = `${ status.map(elm => `${elm} `)}`

    const query = await pool.query(`SELECT status_id, status, color, COUNT(*) AS count
    FROM orden_servicio
    INNER JOIN status
      ON orden_servicio.status_id=status.id
    WHERE status_id IN(
    SELECT id FROM status WHERE status_id IN (${selectedStatus}))
    GROUP BY status_id;`)
      
    res.json({
      ok: true,
      res: query,
    })

  })

  router.get("/date", async (req, res) => {

    try {
      const query = await pool.query(`SELECT * FROM orden_servicio ORDER BY receptionDate DESC;`);

      const currentMonth = DateTime.now().setLocale('es-ES').toFormat('MMMM').toUpperCase();
      const currentYear = DateTime.now().toObject().year;
      
      const actualOrders = query.filter( q => {
        const date = DateTime.fromMillis(q.receptionDate)
        const year = DateTime.fromMillis(q?.receptionDate)?.toObject()?.year;
        const orderMonth = date.setLocale('es-ES').toFormat('MMMM').toUpperCase();

        return orderMonth.toLowerCase() === currentMonth.toLowerCase() && currentYear === year;
      })

      res.json({
        ok: true,
        count: actualOrders?.length,
      })

    } catch (err) {

      res.json({
        ok: false,
        err
      })
    }

  })

  router.get("/chart", async (req, res) => {
    
    const startOfLastMonth = DateTime.now().plus({ months: -1 }).startOf('month').toMillis();
    const startOfCurrentMonth = DateTime.now().startOf('month').toMillis()
    const endOfMonth = DateTime.now().plus({ months: 1 }).startOf('month').toMillis();

    const lastMonthLabel = DateTime.fromMillis(startOfLastMonth).setLocale('es-ES').toFormat('MMMM').toUpperCase()
    const currentMonthLabel = DateTime.fromMillis(startOfCurrentMonth).setLocale('es-ES').toFormat('MMMM').toUpperCase()

    const buildQuery = (start, end) => (
      `SELECT receptionDate, solucion_id, falla, solucion, COUNT(solucion_id) AS count
      FROM orden_servicio 
      INNER JOIN soluciones 
        ON orden_servicio.solucion_id=soluciones.id
      INNER JOIN fallas
        ON soluciones.falla_id=fallas.id
      WHERE receptionDate > ${start} AND receptionDate < ${end}
      GROUP BY solucion_id;`
    )

    const labels = await pool.query(`SELECT solucion FROM soluciones ORDER BY solucion ASC;`);
    const categories = [...new Set(labels.map(elm => elm.solucion))];

    const lastMonthCount = await pool.query(buildQuery(startOfLastMonth, startOfCurrentMonth));
    const currentMonthCount = await pool.query(buildQuery(startOfCurrentMonth, endOfMonth));

    const currentSerie = new Array(categories.length).fill(0);
    const lastSerie = new Array(categories.length).fill(0);

    currentMonthCount.map( elm => {
      const targetIndex = categories.indexOf(elm.solucion);
      currentSerie[targetIndex] = +(currentSerie[targetIndex] || null) + elm.count
    });

    lastMonthCount.map( elm => {
      const targetIndex = categories.indexOf(elm.solucion);
      lastSerie[targetIndex] = +(lastSerie[targetIndex] || null) + elm.count
    });

    const chartData = {
      series: [
        {
          name: lastMonthLabel,
          data: lastSerie
        },
        {
          name: currentMonthLabel,
          data: currentSerie
        },
      ],
      categories,
    };

    res.json({
      ok: true,
      res: {...chartData}
    });

      
  })


}