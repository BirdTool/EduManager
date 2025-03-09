import { Context } from 'hono'
import { registerSchemaTeacher, registerSchemaStudent, registerSchemaMajor } from '../schemas/registerSchema'
import pool from '../services/db'

export const registerController = async (c: Context) => {
    const type = c.req.param('type')
    const body = await c.req.json()

    switch (type) {
        case "student": {
            try {
                await pool.query(`
                    CREATE TABLE IF NOT EXISTS students (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        matricula VARCHAR(255) DEFAULT NULL CHECK (LENGTH(matricula) >= 8),
                        idade INTEGER NOT NULL,
                        aniversario DATE NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        genero VARCHAR(10) NOT NULL,
                        telefone VARCHAR(15) NOT NULL,
                        notas JSONB DEFAULT '[]',
                        advertencias JSONB DEFAULT '[]',
                        ocorrencias JSONB DEFAULT '[]',
                        suspensoes JSONB DEFAULT '[]'
                    );
                `);

                const validatedData = registerSchemaStudent.safeParse(body);
                if (!validatedData.success) {
                    return c.json({ success: false, message: 'Invalid credentials', errors: validatedData.error.errors }, 400);
                }
                const { name, age, birthday, email, gender, phone } = validatedData.data;
                try {
                    const res = await pool.query(
                        "INSERT INTO students (nome, idade, aniversario, email, genero, telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
                        [name, age, birthday, email, gender, phone]
                    );
                    console.log("Usuário inserido:", res.rows[0]);
                    return c.json({
                        success: true,
                        message: 'Usuário inserido com sucesso',
                        data: { name, age }
                    }, 200);
                } catch (error) {
                    console.error("Erro ao inserir usuário:", error);
                    return c.json({ success: false, message: 'Erro ao inserir usuário' }, 500);
                }
            } catch (err) {
                console.error("Algum erro aonteceu:", err);
                return c.json({ success: false, message: 'Erro ao criar tabela' }, 500);
            }
        }
        default: {
            return c.json({ success: false, message: 'Tipo de registro inválido' }, 400);
        }
    }
}
