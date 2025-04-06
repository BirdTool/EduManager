import { Context } from 'hono'
import pool from '../../services/db'

export const deleteStudent = async (c: Context) => {
    const studentMatricula = c.req.param('id')
    const student = await pool.query(`DELETE FROM students WHERE id = $1`, [studentMatricula])

    if (!student || student.rowCount === 0) return c.json({ message: "Error, this student does not existing" }, 404)

    return c.json({ message: "Student deleted successfully" })
}