import { Context } from 'hono'
import { registerSchemaStudent } from '../schemas/registerSchema'
import pool from '../services/db'

export const registerController = async (c: Context) => {
    const type = c.req.param('type')
    const body = await c.req.json()

    switch (type) {
        case "student": {
            try {
                // Criar a tabela apenas se ela não existir (removido o DROP TABLE)
                await pool.query(`
                    CREATE TABLE IF NOT EXISTS students (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        matricula VARCHAR(255) DEFAULT NULL CHECK (LENGTH(matricula) >= 8),
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
                    return c.json({ 
                        success: false, 
                        message: 'Invalid credentials', 
                        errors: validatedData.error.errors 
                    }, 400);
                }
                
                const { name, birthday, email, gender, phone } = validatedData.data;

                // Verificar se o nome já existe
                const nameCheck = await pool.query(
                    "SELECT nome FROM students WHERE nome = $1",
                    [name]
                );

                if (nameCheck.rows.length > 0) {
                    return c.json({
                        success: false,
                        message: 'Já existe um estudante cadastrado com este nome'
                    }, 409);
                }

                // Inserir o novo estudante
                const res = await pool.query(
                    "INSERT INTO students (nome, aniversario, email, genero, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
                    [name, birthday, email, gender, phone]
                );
                
                console.log("Usuário inserido:", res.rows[0]);
                return c.json({
                    success: true,
                    message: 'Usuário inserido com sucesso',
                    data: res.rows[0] // Retornando todos os dados inseridos
                }, 201); // 201 é mais apropriado para criação

            } catch (err) {
                console.error("Erro ao executar o código:", err);
                return c.json({ 
                    success: false, 
                    message: 'Erro ao processar o registro' 
                }, 500);
            }
        }
        default: {
            return c.json({ 
                success: false, 
                message: 'Tipo de registro inválido' 
            }, 400);
        }
    }
}