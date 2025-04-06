import { Context } from "hono";
import pool from "../../services/db";
import { registerSchemaStudent } from "../../schemas/registerSchema";
import Student from "../../types/studentType";

export const postStudent = async (c: Context) => {
    try {
        const body = await c.req.json();
    
        const data = registerSchemaStudent.safeParse(body);
    
        if (!data.success) return c.json({ success: false, message: 'Dados inválidos', errors: data.error.errors }, 400);
        const { name, email, phone, birthday, gender, parent1, parent2 } = data.data;
    
        const ifExist = await pool.query(`SELECT * FROM students WHERE nome = $1 AND email = $2`, [name, email]);
    
        if (ifExist.rows.length > 0) return c.json({ success: false, message: 'Estudante já cadastrado' }, 400);
    
        const student: Student = (await pool.query(`INSERT INTO students (nome, email, telefone, aniversario, genero, responsavel1, responsavel2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [name, email, phone, birthday, gender, parent1, parent2])).rows[0];
    
        const matricula = `${new Date().getFullYear()}-1-${student.id}`;
    
        await pool.query(`UPDATE students SET matricula = $1 WHERE id = $2`, [matricula, student.id]);
    
        return c.json({ success: true, message: 'Estudante cadastrado com sucesso', student });
    } catch (error) {
        console.error('Error registering student:', error);
        return c.json({ message: "a error occurred while registering the student" }, 500);
    }
}