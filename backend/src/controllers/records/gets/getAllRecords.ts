import { Context } from 'hono'
import pool from '../../../services/db';
import createLog from '../../../utils/log';

export const getRecords = async (c: Context) => {
    try {
        const records = await pool.query('SELECT * FROM records');
        if (!records || records.rowCount === 0) {
            return c.json({ message: "Error, no records found" }, 404);
        }

        await createLog({
            title: "Todos os registros foram listados",
            description: "Todos os registros foram listados",
            table: 'records'
        })
        return c.json(records.rows);
    } catch (e) {
        console.error('Error fetching records:', e);
        return c.json({ message: "Error fetching records" }, 500);
    }
}