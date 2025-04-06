import { Context } from "hono";
import pool from "../../services/db";
import Student from "../../types/studentType";

export const putStudent = async (c: Context) => {
    try {
        const idParam = c.req.param('id');
        const body = await c.req.json();
        const { name, email, phone, birthday, gender, parent1, parent2, notes, 
                warnings, occurrence, suspension, classe, matricula } = body; // Obter nova matrícula do corpo

        // Verificar se o estudante existe
        const result = await pool.query(`SELECT * FROM students WHERE id = $1`, [idParam]);
        const student: Student = result.rows[0];

        if (!student) return c.json({ success: false, message: 'Estudante não encontrado' }, 404);

        // Se uma nova matrícula foi fornecida, use-a; caso contrário, mantenha a atual
        const newMatricula = matricula || student.matricula;

        const newStudent: Student = {
            id: student.id,
            nome: name || student.nome,
            matricula: newMatricula,
            aniversario: birthday || student.aniversario,
            notas: notes || student.notas,
            advertencias: warnings || student.advertencias,
            ocorrencias: occurrence || student.ocorrencias,
            suspensoes: suspension || student.suspensoes,
            responsavel1: parent1 || student.responsavel1,
            responsavel2: parent2 || student.responsavel2,
            email: email || student.email,
            telefone: phone || student.telefone,
            genero: gender || student.genero,
            classe: classe || student.classe
        };

        await pool.query(
            `UPDATE students SET 
                nome = $1, 
                email = $2, 
                telefone = $3,
                aniversario = $4, 
                genero = $5, 
                responsavel1 = $6, 
                responsavel2 = $7, 
                notas = $8, 
                advertencias = $9, 
                ocorrencias = $10, 
                suspensoes = $11, 
                classe = $12,
                matricula = $13
            WHERE id = $14`,
            [
                newStudent.nome, 
                newStudent.email, 
                newStudent.telefone,
                newStudent.aniversario, 
                newStudent.genero, 
                newStudent.responsavel1, 
                newStudent.responsavel2, 
                newStudent.notas, 
                newStudent.advertencias, 
                newStudent.ocorrencias, 
                newStudent.suspensoes, 
                newStudent.classe,
                newStudent.matricula,
                idParam
            ]
        );

        return c.json({ success: true, message: 'Estudante atualizado com sucesso', data: newStudent });
    } catch (error: any) {
        console.error('Erro ao atualizar estudante:', error);
        return c.json({ success: false, message: 'Erro ao atualizar estudante', error: error.message }, 500);
    }
}
