import { Context } from "hono";
import pool from "../../services/db";

export const getStudents = async (c: Context) => {
    const students = await pool.query(`SELECT * FROM students`);
    
    return c.json(students.rows);
}

export const getStudent = async (c: Context) => {
    const studentMatricula = c.req.param('id');
    const student = await pool.query(`SELECT * FROM students WHERE id = $1`, [studentMatricula]);

    if (!student || student.rowCount === 0) return c.json({ message: "Error, this student does not existing" }, 404);

    return c.json(student.rows[0]);
}