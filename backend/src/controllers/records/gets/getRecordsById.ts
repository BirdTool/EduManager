import { Context } from 'hono'
import pool from '../../../services/db'

export const getRecordsById = async (c: Context) => {
    const id = c.req.param('id');

    try {
        const record = await pool.query('SELECT * FROM records WHERE id = $1', [id]);
        if (!record || record.rowCount === 0) {
            return c.json({ message: "Error, this record does not existing" }, 404);
        }
        return c.json(record.rows[0]);
    } catch (error) {
        console.error('Error fetching records:', error);
        return c.json({ message: "Error fetching records" }, 500);
    }
}