import { Context } from 'hono'
import pool from '../../../services/db';

export const getRecordsByResponsible = async (c: Context) => {
    const responsibleId = c.req.param('responsible');

    try {
        const records = await pool.query('SELECT * FROM records WHERE responsavel = $1', [responsibleId]);
        if (!records || records.rowCount === 0) {
            return c.json({ message: "Error, this record does not existing" }, 404);
        }
        return c.json(records.rows);
    } catch (error) {
        console.error('Error fetching records:', error);
        return c.json({ message: "Error fetching records" }, 500);
    }
}