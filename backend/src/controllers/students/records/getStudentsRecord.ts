import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log'

const prisma = new PrismaClient()

export const getStudentsRecord = async (c: Context) => {
    const studentId = c.req.param('id');
    const type = c.req.param('type');

    try {
        switch(type) {
            case "warnings": {
                await createLog({
                    title: "Consulta de advertências",
                    description: `Consulta de advertências do estudante ID: ${studentId}`,
                    table: "records",
                    level: "info"
                });
                
                const warnings = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "advertencia"
                    },
                });
            
                if (!warnings || warnings.length === 0) {
                    await createLog({
                        title: "Advertências não encontradas",
                        description: `Nenhuma advertência encontrada para o estudante ID: ${studentId}`,
                        table: "records",
                        level: "warn"
                    });
                    return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
                }
            
                return c.json(warnings)
            }
            case "occurences": {
                await createLog({
                    title: "Consulta de ocorrências",
                    description: `Consulta de ocorrências do estudante ID: ${studentId}`,
                    table: "records",
                    level: "info"
                });
                
                const occurences = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "ocorrencia"
                    }
                });
    
                if (!occurences || occurences.length === 0) {
                    await createLog({
                        title: "Ocorrências não encontradas",
                        description: `Nenhuma ocorrência encontrada para o estudante ID: ${studentId}`,
                        table: "records",
                        level: "warn"
                    });
                    return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
                }
    
                return c.json(occurences)
            }
            case "suspensions": {
                await createLog({
                    title: "Consulta de suspensões",
                    description: `Consulta de suspensões do estudante ID: ${studentId}`,
                    table: "records",
                    level: "info"
                });
                
                const suspensions = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "suspensao"
                    }
                });
    
                if (!suspensions || suspensions.length === 0) {
                    await createLog({
                        title: "Suspensões não encontradas",
                        description: `Nenhuma suspensão encontrada para o estudante ID: ${studentId}`,
                        table: "records",
                        level: "warn"
                    });
                    return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
                }
               
                return c.json(suspensions)
            }
            case "allrecords": {
                await createLog({
                    title: "Consulta de todos os registros",
                    description: `Consulta de todos os registros do estudante ID: ${studentId}`,
                    table: "records",
                    level: "info"
                });
                
                const records = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId)
                    }
                });
    
                if (!records || records.length === 0) {
                    await createLog({
                        title: "Registros não encontrados",
                        description: `Nenhum registro encontrado para o estudante ID: ${studentId}`,
                        table: "records",
                        level: "warn"
                    });
                    return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
                }

                return c.json(records)
            }
            default: {
                await createLog({
                    title: "Tipo de registro inválido",
                    description: `Tentativa de consulta com tipo inválido: ${type} para o estudante ID: ${studentId}`,
                    table: "records",
                    level: "warn"
                });
                return c.json({ message: "this type does not existing" }, 404)
            }
        }
    } catch (error) {
        console.error('Error fetching student records:', error);
        await createLog({
            title: "Erro ao buscar registros",
            description: `Erro ao buscar registros do tipo ${type} para o estudante ID: ${studentId}.`,
            table: "records",
            level: "error"
        });
        return c.json({ message: "Error fetching student records" }, 500);
    }
}
