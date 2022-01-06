import mysql from 'mysql2';
import { promisify } from 'util';

const pool = mysql.createPool({
    user: "root",
    password: "root",
    database: "dpasada"
})

pool.getConnection((err, connection) => {

    if (err) {
        
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('DB CONNECTION CLOSED.')
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('DB HAS TOO MANY CONNECTIONS.')
                break;
            case 'ECONNREFUSED':
                console.error('DB CONNECTION REFUSED.')
                break;
            default:
                console.error(err);
                break;
        }

    } else if (connection)  {
        connection.release();
        console.log('DB connected.');
    }
    
    return

});

pool.query = promisify( pool.query );

export default pool;
