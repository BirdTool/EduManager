import { Context } from 'hono'
import { registerSchemaStudent, registerSchemaTeacher, registerSchemaManagement } from '../schemas/registerSchema'
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
                        aniversario DATE NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        genero VARCHAR(10) NOT NULL,
                        telefone VARCHAR(15) NOT NULL,
                        notas JSONB DEFAULT '[]',
                        responsavel1 VARCHAR(100) NOT NULL,
                        responsavel2 VARCHAR(100) DEFAULT NULL,
                        classe VARCHAR(20) DEFAULT NULL
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

                const { name, birthday, email, gender, phone, parent1, parent2 } = validatedData.data;

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
                    "INSERT INTO students (nome, aniversario, email, genero, telefone, responsavel1, responsavel2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
                    [name, birthday, email, gender, phone, parent1, parent2]
                );

                console.log("Usuário inserido:", res.rows[0]);
                return c.json({
                    success: true,
                    message: 'Usuário inserido com sucesso',
                    data: res.rows[0]
                }, 201);

            } catch (err) {
                console.error("Erro ao executar o código:", err);
                return c.json({
                    success: false,
                    message: 'Erro ao processar o registro'
                }, 500);
            }
        }
        case "teacher": {
            try {
                await pool.query(`
                    CREATE TABLE IF NOT EXISTS teachers (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        telefone VARCHAR(12) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        senha VARCHAR(255) NOT NULL,
                        genero VARCHAR(10) NOT NULL,
                        aniversario DATE NOT NULL,
                        disciplinas JSONB DEFAULT '[]',
                        classes JSONB DEFAULT '[]'
                    );
                `);

                const validatedData = registerSchemaTeacher.safeParse(body);
                if (!validatedData.success) {
                    return c.json({
                        success: false,
                        message: 'Invalid credentials',
                        errors: validatedData.error.errors
                    }, 400);
                }

                const { name, birthday, email, phone, gender, matery, password } = validatedData.data;

                // Verificar se o nome já existe
                const nameCheck = await pool.query(
                    "SELECT nome FROM teachers WHERE nome = $1",
                    [name]
                );

                const mailCheck = await pool.query(
                    "SELECT email FROM teachers WHERE email = $1",
                    [email]
                );

                if (nameCheck.rows.length > 0) {
                    return c.json({
                        success: false,
                        message: 'Já existe um professor cadastrado com este nome'
                    }, 409);
                }
                if (mailCheck.rows.length > 0) {
                    return c.json({
                        success: false,
                        message: 'Já existe um professor cadastrado com este email'
                    }, 409);
                }

                // Inserir o novo professor
                const res = await pool.query(
                    "INSERT INTO teachers (nome, aniversario, email, genero, telefone, disciplinas, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
                    [name, birthday, email, gender, phone, JSON.stringify(matery), password]
                );


                console.log("Usuário inserido:", res.rows[0]);
                return c.json({
                    success: true,
                    message: 'Usuário inserido com sucesso',
                    data: res.rows[0]
                }, 201);

            } catch (err) {
                console.error("Erro ao executar o código:", err);
                return c.json({
                    success: false,
                    message: 'Erro ao processar o registro'
                }, 500);
            }
        }
        case "management": {
            try {
                await pool.query(`
                    CREATE TABLE IF NOT EXISTS management (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        telefone VARCHAR(12) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        senha VARCHAR(255) NOT NULL,
                        genero VARCHAR(10) NOT NULL,
                        aniversario DATE NOT NULL,
                        cargo VARCHAR(20) NOT NULL
                    );
                `);

                const validatedData = registerSchemaManagement.safeParse(body);
                if (!validatedData.success) {
                    return c.json({
                        success: false,
                        message: 'Invalid credentials',
                        errors: validatedData.error.errors
                    }, 400);
                }

                const { name, birthday, email, phone, gender, password, role } = validatedData.data;

                // Verificar se o nome já existe
                const checkExisting = await pool.query(
                    `
                    SELECT 'management' AS source, nome, email FROM management WHERE nome = $1 OR email = $2
                    UNION ALL
                    SELECT 'teachers' AS source, nome, email FROM teachers WHERE nome = $1 OR email = $2
                    `,
                    [name, email]
                );
                
                if (checkExisting.rows.length > 0) {
                    return c.json({
                        success: false,
                        message: 'Já existe um registro com este nome ou email',
                        conflicts: checkExisting.rows // Retorna a origem do conflito
                    }, 409);
                }

                // Inserir o novo funcionário
                const res = await pool.query(
                    "INSERT INTO management (nome, email, senha, aniversario, genero, telefone, cargo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
                    [name, email, password, birthday, gender, phone, role]
                );


                console.log("Usuário inserido:", res.rows[0]);
                return c.json({
                    success: true,
                    message: 'Usuário inserido com sucesso',
                    data: res.rows[0]
                }, 201);

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