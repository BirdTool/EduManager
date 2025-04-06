import { Context } from "hono";
import pool from "../../services/db";

export const getStudents = async (c: Context) => {
    const students = await pool.query(`SELECT * FROM students`);
    
    return c.json(students.rows);
}

export const getStudent = async (c: Context) => {
    const id = c.req.param('id');
    const idNumber = Number.parseInt(id);
    if (Number.isNaN(idNumber)) return c.json({ message: "Error, this student does not existing" }, 404);
    const student = await pool.query(`SELECT * FROM students WHERE id = $1`, [id]);

    if (!student || student.rowCount === 0) return c.json({ message: "Error, this student does not existing" }, 404);

    return c.json(student.rows[0]);
}