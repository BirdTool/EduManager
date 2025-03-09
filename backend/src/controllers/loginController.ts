import { Context } from 'hono'
import { loginSchemaTeacher, loginSchemaStudent, loginSchemaMajor } from '../schemas/loginSchema'
import pool from '../services/db'

export const loginController = async (c: Context) => {
    try {
        const type = c.req.param('type')
        const body = await c.req.json()

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
            
                    // Login bem-sucedido
                    return c.json({
                        success: true,
                        message: 'Login bem-sucedido',
                        data: { name, matricula }
                    }, 200);
                } catch (error) {
                    console.error("Erro ao verificar estudante:", error);
                    return c.json({ success: false, message: 'Erro interno no servidor' }, 500);
                }
            }
            case 'teacher': {
                const validatedData = loginSchemaTeacher.safeParse(body);
                if (!validatedData.success) {
                    return c.json({ success: false, message: 'Invalid credentials' }, 400);
                }
                return c.json({
                    success: true,
                    message: 'Login successful',
                    data: { email: validatedData.data.email }
                }, 200);
            }
            case 'major': {
                const validatedData = loginSchemaMajor.safeParse(body);
                if (!validatedData.success) {
                    return c.json({ success: false, message: 'Invalid credentials' }, 400);
                }
                return c.json({
                    success: true,
                    message: 'Login successful',
                    data: { email: validatedData.data.email }
                }, 200);
            }
            default:
                return c.json({ success: false, message: 'Invalid type' }, 400);
        }
    } catch (error) {
        return c.json({ success: false, message: 'Invalid credentials' }, 400);
    }
}
