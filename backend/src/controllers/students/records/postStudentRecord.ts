import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import createLog from '../../../utils/log'

const prisma = new PrismaClient()

const dataObject = z.object({
    reasson: z.string({
        required_error: "Reason is required",
        invalid_type_error: "Reason must be a string"
    }),
    responsible: z.string({
        required_error: "Responsible is required",
        invalid_type_error: "Responsible must be a string"
    }),
    time: z.number({
        invalid_type_error: "Time must be a number"
    }).optional()
})

export const postStudentRecord = async (c: Context) => {
    const type = c.req.param('type');
    const target = c.req.param('id');
    const body = await c.req.json();
    const validatedData = dataObject.safeParse(body);

    if (!validatedData.success) {
        await createLog({
            title: "Dados inválidos para registro",
            description: `Tentativa de criar registro com dados inválidos para o estudante ID: ${target}`,
            userid: Number(target),
            table: "records",
            level: "warn"
        });
        return c.json({ message: "Error, invalid data", errors: validatedData.error.errors }, 400)
    }

    const { reasson, responsible, time } = validatedData.data;
    const date = new Date().toISOString();

    try {
        switch (type) {
            case "occurrence": {
                const record = await prisma.records.create({
                    data: {
                        studentid: Number(target),
                        tipo: 'ocorrencia',
                        motivo: reasson,
                        responsavel: responsible,
                        data: date
                    }
                });
    
                await createLog({
                    title: "Ocorrência criada com sucesso",
                    description: `Ocorrência criada para o estudante ID: ${target}`,
                    table: "records",
                    level: "info"
                });
                
                return c.json({ 
                    message: `Succefull post ocurrence in the student ${record.studentid}`, 
                    data: [record] 
                });
            }
            case "warning": {
                const record = await prisma.records.create({
                    data: {
                        studentid: Number(target),
                        tipo: 'advertencia',
                        motivo: reasson,
                        responsavel: responsible,
                        data: date
                    }
                });
    
                await createLog({
                    title: "Advertência criada com sucesso",
                    description: `Advertência criada para o estudante ID: ${target}`,
                    table: "records",
                    level: "info"
                });
                
                return c.json({ 
                    message: `Succefull post warning in the student ${record.studentid}`, 
                    data: [record] 
                });
            }
            case "suspension": {
                const record = await prisma.records.create({
                    data: {
                        studentid: Number(target),
                        tipo: 'suspensao',
                        motivo: reasson,
                        responsavel: responsible,
                        data: date,
                        dias: time
                    }
                });
    
                await createLog({
                    title: "Suspensão criada com sucesso",
                    description: `Suspensão criada para o estudante ID: ${target} por ${time || 'não especificado'} dias`,
                    table: "records",
                    level: "info"
                });
                
                return c.json({ 
                    message: `Succefull post suspension in the student ${record.studentid}`, 
                    data: [record] 
                });
            }
            default: {
                await createLog({
                    title: "Tipo de registro inválido",
                    description: `Tentativa de criar registro com tipo inválido: ${type} para o estudante ID: ${target}`,
                    table: "records",
                    level: "warn"
                });
                return c.json({ message: "this type does not existing" }, 404);
            }
        }
    } catch (error) {
        console.error('Error posting student record:', error);
        
        await createLog({
            title: "Erro ao criar registro",
            description: `Erro ao criar registro do tipo ${type} para o estudante ID: ${target}.`,
            table: "records",
            level: "error"
        });

        return c.json({ message: "Error posting student record" }, 500);
    }
}
