import { Context } from 'hono';
import * as jwt from 'jsonwebtoken';
import pool from '../services/db';
import * as crypto from 'crypto';
import { loginSchemaStudent } from '../schemas/loginSchema';

const SECRET_KEY: string = process.env.SECRET_KEY as string;

export const loginController = async (c: Context) => {
    const type = c.req.param('type');
    const body = await c.req.json();

    switch (type) {
        case 'student': {
            // Valida os dados de entrada
            const validatedData = loginSchemaStudent.safeParse(body);
            if (!validatedData.success) {
                return c.json({ success: false, message: 'Dados inválidos', errors: validatedData.error.errors }, 400);
            }

            const { name, matricula } = validatedData.data;

            try {
                // Verifica se o nome e a matrícula correspondem ao mesmo estudante
                const studentCheck = await pool.query(
                    "SELECT id, nome, matricula FROM students WHERE nome = $1 AND matricula = $2",
                    [name, matricula]
                );

                if (studentCheck.rowCount === 0) {
                    // Se não encontrar, verifica se o nome ou a matrícula existem separadamente
                    const nameCheck = await pool.query(
                        "SELECT nome FROM students WHERE nome = $1",
                        [name]
                    );

                    const matriculaCheck = await pool.query(
                        "SELECT matricula FROM students WHERE matricula = $1",
                        [matricula]
                    );

                    if ((nameCheck.rowCount ?? 0) > 0 && (matriculaCheck.rowCount ?? 0) > 0) {
                        // Nome e matrícula existem, mas não correspondem ao mesmo estudante
                        return c.json({ success: false, message: 'Nome e matrícula não correspondem ao mesmo estudante' }, 400);
                    } else if ((nameCheck.rowCount ?? 0) > 0) {
                        // Nome existe, mas a matrícula não corresponde
                        return c.json({ success: false, message: 'Matrícula incorreta para o nome fornecido' }, 400);
                    } else if ((matriculaCheck.rowCount ?? 0) > 0) {
                        // Matrícula existe, mas o nome não corresponde
                        return c.json({ success: false, message: 'Nome incorreto para a matrícula fornecida' }, 400);
                    } else {
                        // Nenhum dos dois existe
                        return c.json({ success: false, message: 'Estudante não encontrado' }, 404);
                    }
                }

                // Login bem-sucedido: gera o token JWT
                const student = studentCheck.rows[0];
                const token = jwt.sign(
                    { id: student.id, name: student.nome, role: 'student' }, // Payload do token
                    SECRET_KEY, // Chave secreta
                    { expiresIn: '1h' } // Tempo de expiração do token
                );

                const csrfToken = crypto.randomBytes(32).toString('hex');
                c.header('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`); // adicionar Secure após HttpOnly em produção
                return c.json(
                    { success: true, message: 'Login bem-sucedido', data: { name: student.nome, matricula: student.matricula, csrfToken } },
                    200
                );
            } catch (error) {
                console.error("Erro ao verificar estudante:", error);
                return c.json({ success: false, message: 'Erro interno no servidor' }, 500);
            }
        }
        default: {
            return c.json({ success: false, message: 'Tipo de registro inválido' }, 400);
        }
    }
};