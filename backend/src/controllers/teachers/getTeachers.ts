import { Context } from 'hono'
import pool from '../../services/db';

export const getTeachers = async (c: Context) => {
    try {
        const id = c.req.param('id');

        if (id) {
            const idNumber = Number.parseInt(id);
            const teacher = await pool.query('SELECT * FROM teachers WHERE id = $1', [idNumber]);

            if (teacher && teacher.rowCount === 0) {
                return c.json({ error: 'Teacher not found' }, 404);
            }

            return c.json(teacher.rows[0])
        } else {
            const teachers = await pool.query('SELECT * FROM teachers');
    
            return c.json(teachers.rows);
        }
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}