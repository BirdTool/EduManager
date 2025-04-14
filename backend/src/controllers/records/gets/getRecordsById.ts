import { Context } from 'hono'
import pool from '../../../services/db'
import createLog from '../../../utils/log';

export const getRecordsById = async (c: Context) => {
    const id = Number(c.req.param('id'));

    try {
        const record = await pool.query('SELECT * FROM records WHERE id = $1', [id]);
        if (!record || record.rowCount === 0) {
            return c.json({ message: "Error, this record does not existing" }, 404);
        }

        await createLog({
            title: "Foi obtido um registro",
            description: `O registro ${id} foi obtido com sucesso`,
            userid: id,
            table: 'records'
        })
        return c.json(record.rows[0]);
    } catch (error) {
        console.error('Error fetching records:', error);
        return c.json({ message: "Error fetching records" }, 500);
    }
}