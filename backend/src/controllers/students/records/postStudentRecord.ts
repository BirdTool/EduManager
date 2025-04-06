import { Context } from 'hono'
import pool from '../../../services/db';

export const postStudentRecord = async (c: Context) => {
    const type = c.req.param('type');
    const target = c.req.param('id');
    const body = await c.req.json();

    const { reasson, responsible, time } = body;
    const date = new Date().toISOString();

    try {
        switch (type) {
            case "occurrence": {
                const poolQ = await pool.query(
                    `INSERT INTO records (studentid, tipo, motivo, responsavel, data) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                    [target, type, reasson, responsible, date]
                );
    
                return c.json({ message: `Succefull post ocurrence in the student ${poolQ.rows[0].studentid}`, data: poolQ.rows });
            }
            case "warning": {
                const poolQ = await pool.query(
                    `INSERT INTO records (studentid, tipo, motivo, responsavel, data) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                    [target, type, reasson, responsible, date]
                );
    
                return c.json({ message: `Succefull post warning in the student ${poolQ.rows[0].studentid}`, data: poolQ.rows });
            }
            case "suspension": {
                const poolQ = await pool.query(
                    `INSERT INTO records (studentid, tipo, motivo, responsavel, data, dias) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                    [target, type, reasson, responsible, date, time]
                );
    
                return c.json({ message: `Succefull post suspension in the student ${poolQ.rows[0].studentid}`, data: poolQ.rows });
            }
            default: return c.json({ message: "this type does not existing" }, 404);
        }
    } catch (error) {
        console.error('Error posting student record:', error);

        return c.json({ message: "Error posting student record" }, 500);
    }
}