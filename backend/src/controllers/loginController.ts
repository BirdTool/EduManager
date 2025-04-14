import { Context } from 'hono';
import * as jwt from 'jsonwebtoken';
import pool from '../services/db';
import * as crypto from 'crypto';
import { loginSchemaStudent, loginSchemaTeacher, loginSchemaManagement } from '../schemas/loginSchema';
import createLog from '../utils/log';

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
                        await createLog({
                            title: "Tentativa de login com nome e matrícula não correspondentes",
                            description: `Tentativa de login com nome ${name} e matrícula ${matricula} que não correspondem ao mesmo estudante.`,
                            table: 'students',
                            level: 'warn'
                        })
                        return c.json({ success: false, message: 'Nome e matrícula não correspondem ao mesmo estudante' }, 400);
                    } else if ((nameCheck.rowCount ?? 0) > 0) {
                        // Nome existe, mas a matrícula não corresponde
                        await createLog({
                            title: "Tentativa de login mal sucedida, matrícula incorreta",
                            description: `Tentativa de login com nome ${name} e a matricula: ${matricula} que estava incorreta`,
                            table: 'students',
                            level: 'warn'
                        })
                        return c.json({ success: false, message: 'Matrícula incorreta para o nome fornecido' }, 400);
                    } else if ((matriculaCheck.rowCount ?? 0) > 0) {
                        // Matrícula existe, mas o nome não corresponde
                        await createLog({
                            title: "Tentativa de login mal sucedida, nome incorreto",
                            description: `Tentativa de login com nome ${name} que estava incorreto, e a matricula: ${matricula}`,
                            table: 'students',
                            level: 'warn'
                        })
                        return c.json({ success: false, message: 'Nome incorreto para a matrícula fornecida' }, 400);
                    } else {
                        // Nenhum dos dois existe
                        await createLog({
                            title: "Tentativa de login mal sucedida, estudante não encontrado",
                            description: `Tentativa de login com nome ${name} e matricula ${matricula} que não correspondem a nenhum estudante.`,
                            table: 'students',
                            level: 'warn'
                        })
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
                
                const isProd = process.env.NODE_ENV === 'production';
                const secureFlag = isProd ? 'Secure;' : '';
                const sameSite = isProd ? 'None' : 'Lax';

                c.header(
                'Set-Cookie',
                `token=${token}; HttpOnly; Path=/; SameSite=${sameSite}; ${secureFlag} Max-Age=3600`
                );
                // adicionar Secure após HttpOnly em produção

                await createLog({
                    title: "Login bem sucedido",
                    description: `Estudante ${student.nome} com matrícula ${student.matricula} fez login com sucesso.`,
                    userid: student.id,
                    table: 'students',
                })

                return c.json(
                    { success: true, message: 'Login bem-sucedido', data: { name: student.nome, matricula: student.matricula, csrfToken } },
                    200
                );
            } catch (error) {
                console.error("Erro ao verificar estudante:", error);
                return c.json({ success: false, message: 'Erro interno no servidor' }, 500);
            }
        }
        case 'teacher': {
            const validatedData = loginSchemaTeacher.safeParse(body);
            if (!validatedData.success) {
                return c.json({ success: false, message: 'Dados inválidos', errors: validatedData.error.errors }, 400);
            }

            const { email, password } = validatedData.data;

            try {
                const teacherCheck = await pool.query(
                    "SELECT id, nome, email, senha FROM teachers WHERE email = $1 AND senha = $2",
                    [email, password]
                );                

                if (teacherCheck.rowCount === 0) {
                    await createLog({
                        title: "Tentativa de login mal sucedida, professor não encontrado ou senha incorreta",
                        description: `Tentativa de login com email ${email} que foi mal sucedida, pois o professor não foi encontrado ou a senha está incorreta`,
                        table: 'teachers',
                        level: 'warn'
                    })
                    return c.json({ success: false, message: 'Professor não encontrado ou senha incorreta' }, 404);
                }

                const teacher = <{id: number, nome: string, email: string, senha: string}>teacherCheck.rows[0];

                const token = jwt.sign(
                    { id: teacher.id, name: teacher.nome, email: teacher.email, password: teacher.senha, role: 'professor' },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                const csrfToken = crypto.randomBytes(32).toString('hex');
                c.header('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`); // adicionar Secure após HttpOnly em produção
                
                await createLog({
                    title: "Login bem sucedido",
                    description: `Professor ${teacher.nome} com email ${teacher.email} fez login com sucesso.`,
                    userid: teacher.id,
                    table: 'teachers',
                })
                
                return c.json(
                    { success: true, message: 'Login bem-sucedido', data: { name: teacher.nome, email: teacher.email, csrfToken } },
                    200
                );
            } catch (err) {
                console.log("Erro ao verificar professor:", err);
                return c.json({ success: false, message: 'Erro interno no servidor' }, 500);
            }
        }
        case 'management': {
            const validatedData = loginSchemaManagement.safeParse(body);
            if (!validatedData.success) {
                return c.json({ success: false, message: 'Dados inválidos', errors: validatedData.error.errors }, 400);
            }

            const { email, password } = validatedData.data;

            try {
                const managementCheck = await pool.query(
                    "SELECT id, nome, email, senha, cargo FROM management WHERE email = $1 AND senha = $2",
                    [email, password]
                );                

                if (managementCheck.rowCount === 0) {
                    await createLog({
                        title: "Tentativa de login mal sucedida, professor não encontrado ou senha incorreta",
                        description: `Tentativa de login com email ${email} que foi mal sucedida, pois o funcionário não foi encontrado ou a senha está incorreta`,
                        table: 'management',
                        level: 'warn'
                    })
                    return c.json({ success: false, message: 'Professor não encontrado ou senha incorreta' }, 404);
                }

                const management = <{id: number, nome: string, email: string, senha: string, cargo: string}>managementCheck.rows[0];

                const token = jwt.sign(
                    { id: management.id, name: management.nome, email: management.email, password: management.senha, role: management.cargo },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                const csrfToken = crypto.randomBytes(32).toString('hex');
                c.header('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`); // adicionar Secure após HttpOnly em produção
                
                await createLog({
                    title: "Login bem sucedido",
                    description: `Funcionário ${management.nome} com email ${management.email} fez login com sucesso.`,
                    userid: management.id,
                    table: 'management',
                })
                
                return c.json(
                    { success: true, message: 'Login bem-sucedido', data: { name: management.nome, email: management.email, role: management.cargo, csrfToken } },
                    200
                );
            } catch (err) {
                console.log("Erro ao verificar funcionário:", err);
                return c.json({ success: false, message: 'Erro interno no servidor' }, 500);
            }
        }
        default: {
            return c.json({ success: false, message: 'Tipo de registro inválido' }, 400);
        }
    }
};